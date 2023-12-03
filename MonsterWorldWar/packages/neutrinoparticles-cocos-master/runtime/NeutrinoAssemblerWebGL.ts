import NeutrinoComponent from './NeutrinoComponent';

const indices = [0, 1, 3, 1, 2, 3];

export default class NeutrinoAssembler extends cc.Assembler {
    _initialized = false;
    _currentVertex = 0;
    _renderStyleIndex = null;
    _vertexFormat = cc.gfx.VertexFormat.XYZ_UV_Color;
    _buffer = null;
    _bufferOffsetInfo = null;
    _modelBatcher = null;
    _worldScale = new cc.Vec3();

    fillBuffers (comp: NeutrinoComponent, modelBatcher) {
        if (!comp.neutrinoEffect || !comp.context.loaded()) {
            return;
        }

        if (!this._initialized) {
            this._buffer = modelBatcher.getBuffer('mesh', this._vertexFormat);
            this._initialized = true;
        }

        if (comp.hasZeroWorldScale()) {
            return;
        }

        this._modelBatcher = modelBatcher;
        this._renderStyleIndex = null;
        this._worldScale = comp.worldScale;
        
        comp.neutrinoEffect.fillGeometryBuffers([1, 0, 0], [0, 1, 0], [0, 0, -1]);
    }

    // Methods called by neutrinoEffect

    initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {
    }

    beforeQuad(renderStyleIndex) {
        if (this._renderStyleIndex !== renderStyleIndex) {
            const material = this._renderComp.materials[renderStyleIndex];
            if (material) {
                if (material.getHash() !== this._modelBatcher.material.getHash()) {
                    this._modelBatcher._flush();
                    this._modelBatcher.material = material;
                }
            }

            this._renderStyleIndex = renderStyleIndex;
        }
        
        this._bufferOffsetInfo = this._buffer.request(4, indices.length);
    }

    pushVertex(vertex) {
        const oi = this._bufferOffsetInfo;
        const floatsPerVertex = this._vertexFormat._bytes / 4;
        const buffer = this._buffer;

        const floatsBuffer = buffer._vData;
        const uintsBuffer = buffer._uintVData;

        const floatsStart = oi.byteOffset / 4 + this._currentVertex * floatsPerVertex;

        const x = vertex.position[0] * this._worldScale.x;
        const y = vertex.position[1] * this._worldScale.y;
        const z = vertex.position[2] * this._worldScale.z;

        floatsBuffer[floatsStart + 0] = x;
        floatsBuffer[floatsStart + 1] = y;
        floatsBuffer[floatsStart + 2] = z;

        floatsBuffer[floatsStart + 3] = vertex.texCoords[0][0];
        floatsBuffer[floatsStart + 4] = 1.0 - vertex.texCoords[0][1];

        uintsBuffer[floatsStart + 5] = 
            (vertex.color[0]) |
            (vertex.color[1] << 8) |
            (vertex.color[2] << 16) |
            (vertex.color[3] << 24);

        ++this._currentVertex;

        if (this._currentVertex == 4) {
            const idicesBuffer = buffer._iData;

            for (let i = 0; i < indices.length; ++i) {
                idicesBuffer[oi.indiceOffset + i] = oi.vertexOffset + indices[i];
            }

            this._currentVertex = 0;
        }
    }

    pushRenderCall(rc) {
    }

    cleanup() {
    }
}
