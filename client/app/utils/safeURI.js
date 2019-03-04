// import { helper } from '@ember/component/helper';

const safeURI = uri => encodeURI(uri).replace(/%25/g, '%');

export default safeURI;
