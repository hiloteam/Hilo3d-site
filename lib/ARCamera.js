const ARCamera = Hilo3d.Class.create({
    Extends: Camera,
    className: 'ARCamera',
    constructor(params) {
        ARCamera.superclass.constructor.call(this, params);
        this.updateProjectionMatrix();
    },
    updateARMatrix(viewMatrix,projectionMatrix,viewProjectionMatrix) {
        this.viewMatrix = viewMatrix;
        this.projectionMatrix = projectionMatrix;
        this.viewProjectionMatrix = viewProjectionMatrix;
    }
});