import NeutrinoComponent from './NeutrinoComponent';

const renderer = <any>cc.renderer;
//const gfx = renderer.renderEngine.gfx;

const quadIndices = [0, 1, 3, 1, 2, 3];
const numQuadVertices = 4;
const maxQuadsInDrawCall = 512;
const maxVerticesInDrawCall = numQuadVertices * maxQuadsInDrawCall;
const maxIndicesInDrawCall = quadIndices.length * maxQuadsInDrawCall;

export default class NeutrinoAssembler extends cc.MeshRenderer.__assembler__ {
    _currentVertex = 0;
    _renderStyleIndex = null;
    _worldScale = new cc.Vec3();

    static _vertexFormat = cc.gfx.VertexFormat.XYZ_UV_Color;
    static _vertexBuffers: ArrayBuffer[] = [];
    static _vertexFloatBuffers: Float32Array[] = [];
    static _vertexUint32Buffers: Uint32Array[] = [];
    static _indexBuffers: Uint16Array[] = [];
    static _bufferIndex: number;
    static _numBufferVertices: number;
    static _numBufferIndices: number;
    static _startBufferVertex: number;
    static _startBufferIndex: number;

    _drawCallIndex: number;

    static _checkAndCreateCurrentBuffer() {
        const bufIndex = NeutrinoAssembler._bufferIndex;

        if (!NeutrinoAssembler._vertexBuffers[bufIndex]) {
            NeutrinoAssembler._vertexBuffers[bufIndex] = new ArrayBuffer(NeutrinoAssembler._vertexFormat._bytes *
                maxVerticesInDrawCall);
            NeutrinoAssembler._vertexFloatBuffers[bufIndex] = new Float32Array(NeutrinoAssembler._vertexBuffers[bufIndex]);
            NeutrinoAssembler._vertexUint32Buffers[bufIndex] = new Uint32Array(NeutrinoAssembler._vertexBuffers[bufIndex]);
        }

        if (!NeutrinoAssembler._indexBuffers[bufIndex]) {
            NeutrinoAssembler._indexBuffers[bufIndex] = new Uint16Array(maxIndicesInDrawCall);
        }
    }

    static _incBuffer() {
        ++NeutrinoAssembler._bufferIndex;
        NeutrinoAssembler._numBufferVertices = 0;
        NeutrinoAssembler._numBufferIndices = 0;
        NeutrinoAssembler._startBufferVertex = 0;
        NeutrinoAssembler._startBufferIndex = 0;
        NeutrinoAssembler._checkAndCreateCurrentBuffer();
    }

    _prepareForGeometry(numVertices: number, numIndices: number) {
        if (NeutrinoAssembler._numBufferVertices + numVertices == maxVerticesInDrawCall) {
            const i = 0;
        }

        if (NeutrinoAssembler._numBufferVertices + numVertices > maxVerticesInDrawCall
            || NeutrinoAssembler._numBufferIndices + numIndices > maxIndicesInDrawCall) {
                this._finishDrawCall();
                NeutrinoAssembler._incBuffer();
            }        
    }

    _commitGeometry(numVertices: number, numIndices: number) {
        NeutrinoAssembler._numBufferVertices += numVertices;
        NeutrinoAssembler._numBufferIndices += numIndices;
    }

    static _resetGeometryBuffers() {
        
        this._bufferIndex = 0;
        this._numBufferVertices = 0;
        this._numBufferIndices = 0;
        this._startBufferVertex = 0;
        this._startBufferIndex = 0;
        this._checkAndCreateCurrentBuffer();
    }

    _finishDrawCall() {
        if (NeutrinoAssembler._startBufferIndex === NeutrinoAssembler._numBufferIndices) {
            return;
        }

        const bufIndex = NeutrinoAssembler._bufferIndex;

        const subVertices = new Float32Array(NeutrinoAssembler._vertexBuffers[bufIndex],
            NeutrinoAssembler._startBufferVertex * NeutrinoAssembler._vertexFormat._bytes,
            ((NeutrinoAssembler._numBufferVertices - NeutrinoAssembler._startBufferVertex) * NeutrinoAssembler._vertexFormat._bytes) / 4);

        const subIndices = new Uint16Array(NeutrinoAssembler._indexBuffers[bufIndex].buffer, 
            NeutrinoAssembler._startBufferIndex * 2,
            NeutrinoAssembler._numBufferIndices - NeutrinoAssembler._startBufferIndex);

        this.updateIAData(this._drawCallIndex, NeutrinoAssembler._vertexFormat._nativeObj,
            subVertices, subIndices);

        const effect = this._renderComp.materials[this._renderStyleIndex].effect;
        this.updateEffect(this._drawCallIndex, effect._nativeObj);

        NeutrinoAssembler._startBufferVertex = NeutrinoAssembler._numBufferVertices;
        NeutrinoAssembler._startBufferIndex = NeutrinoAssembler._numBufferIndices;
        ++this._drawCallIndex;
    }

    updateRenderData (comp) { 
        this.fillBuffers(comp);
        comp.node._renderFlag |= cc.RenderFlow.FLAG_UPDATE_RENDER_DATA;
    }

    fillBuffers (comp) {
        if (!comp._neutrinoEffect || !comp.context.loaded()) {
            return;
        }

        this.reset(); // CustomAssembler.reset()
        NeutrinoAssembler._resetGeometryBuffers();
        this._drawCallIndex = 0;
        this._currentVertex = 0;
        this._renderStyleIndex = null;
        this._worldScale = comp._worldScale;
        
        comp._neutrinoEffect.fillGeometryBuffers([1, 0, 0], [0, 1, 0], [0, 0, -1]);
        this._finishDrawCall();
    }

    // Methods called by neutrinoEffect

    initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {
    }

    beforeQuad(renderStyleIndex) {
        if (this._renderStyleIndex !== renderStyleIndex) {
            this._finishDrawCall();
            this._renderStyleIndex = renderStyleIndex;
        }
        
        this._prepareForGeometry(numQuadVertices, quadIndices.length);
    }

    pushVertex(vertex) {
        const bufIndex = NeutrinoAssembler._bufferIndex;
        const floatsPerVertex = NeutrinoAssembler._vertexFormat._bytes / 4;
        const floatsBuffer = NeutrinoAssembler._vertexFloatBuffers[bufIndex];
        const uintsBuffer = NeutrinoAssembler._vertexUint32Buffers[bufIndex];

        let floatsStart = (NeutrinoAssembler._numBufferVertices + this._currentVertex) * floatsPerVertex;

        const x = vertex.position[0] * this._worldScale.x;
        const y = vertex.position[1] * this._worldScale.y;
        const z = vertex.position[2] * this._worldScale.z;

        floatsBuffer[floatsStart++] = x;
        floatsBuffer[floatsStart++] = y;
        floatsBuffer[floatsStart++] = z;

        floatsBuffer[floatsStart++] = vertex.texCoords[0][0];
        floatsBuffer[floatsStart++] = 1.0 - vertex.texCoords[0][1];

        uintsBuffer[floatsStart++] = 
            (vertex.color[0]) |
            (vertex.color[1] << 8) |
            (vertex.color[2] << 16) |
            (vertex.color[3] << 24);

        ++this._currentVertex;

        if (this._currentVertex == 4) {
            const idicesBuffer = NeutrinoAssembler._indexBuffers[bufIndex];

            for (let i = 0; i < quadIndices.length; ++i) {
                idicesBuffer[NeutrinoAssembler._numBufferIndices + i] = 
                    (NeutrinoAssembler._numBufferVertices - NeutrinoAssembler._startBufferVertex) 
                    + quadIndices[i];
            }

            this._commitGeometry(numQuadVertices, quadIndices.length);
            this._currentVertex = 0;
        }
    }

    pushRenderCall(rc) {
    }

    cleanup() {
    }
}
