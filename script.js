generationTabButton = document.getElementById("generation-tab-button")
interpolationTabButton = document.getElementById("interpolation-tab-button")
interpolateGetNewImages = document.getElementById("interpolateGetNewImages")

generationTabActive = true

encoder_loaded = false
decoder_loaded = false

generationTab = document.getElementById("generation-tab")
interpolationTab = document.getElementById("interpolation-tab")

interpolationSlider =document.getElementById("interpolationFactor")

canvasA = document.getElementById("canvas1")
canvasB = document.getElementById("canvas2")
encodedA = 0
encodedB = 0



generationTabButton.onclick = function(){
    if (!generationTabActive) {
        generationTabActive = true
        generationTabButton.classList.add("active")
        interpolationTabButton.classList.remove("active")
        generationTab.classList.replace("d-none","d-block")
        interpolationTab.classList.replace("d-block","d-none")
    }    
}

interpolationTabButton.onclick = function(){
    if (generationTabActive) {
        generationTabActive = false
        interpolationTabButton.classList.add("active")
        generationTabButton.classList.remove("active")
        generationTab.classList.replace("d-block","d-none")
        interpolationTab.classList.replace("d-none","d-block")
    }
}

imageUrlHead = "https://raw.githubusercontent.com/BpAAP/PokemonVAE/master/imgs/exportImgs/"
imageUrlTail = ".jpg"
imageUrls = []
for(i = 0; i < 50; i++){
    imageUrls.push(imageUrlHead+i.toString()+imageUrlTail)
}

function getInterpolateNewImages(){
    imgElements = document.getElementsByClassName("img-thumbnail")
    for (i=0;i<imgElements.length;i++){
        chosen =  imageUrls[Math.floor(Math.random() * imageUrls.length)]
        imgElements[i].src = chosen
    }
    let imageA = imgElements[0]
    let imageB = imgElements[1]
    imageClicked(imageA)
    imageClicked(imageB)
}

interpolateGetNewImages.onclick = function(){
    getInterpolateNewImages()
}

selectCounter = 0
let imgElements = document.getElementsByClassName("img-thumbnail")
let imageA = imgElements[0]
let imageB = imgElements[1]
imageClicked(imageA)
imageClicked(imageB)


function imageClicked(e){
    
    if (selectCounter%2 == 0){
        imageA.classList.remove("border-success")
        e.classList.add("border-success")
        imageA = e
    } else {
        imageB.classList.remove("border-danger")
        e.classList.add("border-danger")
        imageB = e
    }
    selectCounter += 1
}

function processImage(img,isA){
    canvas = 0
    if (isA){
        canvas = canvasA
    }else{
        canvas = canvasB
    }
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')
    img.crossOrigin = "Anonymous"
    ctx.drawImage(img,0,0)
    const imageAPixels = ctx.getImageData(0,0,128,128)
    
    img_arr = []
    for (i=0;i<128;i++){
        temp_row = []
        for (j=0;j<128;j++){
            temp_pixel = []
            temp_pixel.push(i*128+j*4)
            temp_pixel.push(i*128+j*4+1)
            temp_pixel.push(i*128+j*4+2)
            temp_row.push(temp_pixel)
        }
        img_arr.push(temp_row)
    }
    return img_arr
}

interpolationSlider.onchange = async function(){
    if(imageA && imageB){
        interpolationFactor = parseFloat(interpolationSlider.value)/100
        console.log(interpolationFactor)
        arrA = processImage(imageA,true)
        arrB = processImage(imageB,false)
        await encode(arrA,true)
        await encode(arrB,false)
        console.log(encodedA)
    }    
}

async function load_encoder(){LeakyReLU()
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/BpAAP/PokemonVAE/master/js_model/js_encoder/model.json')
    await model.save('localstorage://models/encoder')
    encoder_loaded = true
    console.log("Encoder was downloaded and saved to local storage")
}

async function encode(array,isA){
    if (!encoder_loaded){
        await load_encoder()
    }

    console.log("encoding")
    const model = await tf.loadLayersModel('localstorage://models/encoder')
    in_tensor = tf.tensor([array])
    console.log(model.predict(in_tensor))
    if (isA){
        encodedA = model.predict(in_tensor)
    }else{
        encodedB = model.predict(in_tensor)
    }
    
    
}

async function load_decoder(){
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/BpAAP/PokemonVAE/master/js_model/js_decoder/model.json')
    await model.save('localstorage://models/decoder')
    decoder_loaded = true
    console.log("Decoder was downloaded and saved to local storage")
}

async function decode(array){
    if (!decoder_loaded){
        await load_decoder()
    }

    console.log("decoding")
    const model = await tf.loadLayersModel('localstorage://models/decoder')
    in_tensor = tf.tensor([array])
    const decoding = model.predict(in_tensor)
    return decoding
}


window.onload = function(){
    getInterpolateNewImages()
    imgElements = document.getElementsByClassName("img-thumbnail")
    interpolationSlider.max = 100
    interpolationSlider.min = 0
}