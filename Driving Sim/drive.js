AFRAME.registerComponent('drive', {
    init: function(){
        this.driveCar()
    },
    
    driveCar: function(){
        var multiply = 10
        var wheelRotation = 0
        window.addEventListener("keydown", function(e){
            var wheel = document.querySelector("#control-wheel")
            if (e.code == 'ArrowRight' && wheelRotation > -40){
                wheelRotation -= 45
                wheel.setAttribute('rotation',{x:0, y:0, z:wheelRotation})
            }
            if (e.code == 'ArrowLeft' && wheelRotation < 40){
                wheelRotation += 5
                wheel.setAttribute('rotation',{x:0, y:0, z:wheelRotation})
            }
            var cameraRig = document.querySelector('#camera-rig')
            var cameraRotataion = cameraRig.getAttribute('rotation')
            var cameraPosition = cameraRig.getAttribute('position')
            var cameraMoveControls = cameraRig.getAttribute('movement-controls')
            cameraRig.setAttribute('movement-controls', {'speed': cameraMoveControls.speed+0.005})
            var cameraDirection = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDirection)
            if (e.code == "ArrowRight"){
                cameraRotataion.y -= 5
                cameraRig.setAttribute('rotation', {x:0, y:cameraRotataion.y, z:0})
                cameraRig.setAttribute('movement-controls', {'speed':cameraMoveControls.speed+0.05})
            }
            if (e.code == "ArrowLeft"){
                cameraRotataion.y += 5
                cameraRig.setAttribute('rotation', {x:0, y:cameraRotataion.y, z:0})
                cameraRig.setAttribute('movement-controls', {'speed':cameraMoveControls.speed+0.05})
            }

            if (e.code == 'ArrowUp'){
                multiply+=0.5
                if (multiply <= 100 && cameraPosition.z > -500){
                    cameraRig.setAttribute('movement-controls', {'speed':cameraMoveControls.speed+0.05})
                    var acceleratorCar = document.querySelector('#control-acc')
                    acceleratorCar.setAttribute('material', 'color', 'green')
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute('text', {value: multiply})
                }
            }
        })
    }
})