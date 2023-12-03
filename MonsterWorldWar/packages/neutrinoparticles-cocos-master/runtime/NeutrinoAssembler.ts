import NeutrinoAssemblerWebGL from './NeutrinoAssemblerWebGL';
import NeutrinoAssemblerJSB from './NeutrinoAssemblerJSB';

const NeutrinoAssembler = CC_JSB ? NeutrinoAssemblerJSB : NeutrinoAssemblerWebGL;
export default NeutrinoAssembler;
