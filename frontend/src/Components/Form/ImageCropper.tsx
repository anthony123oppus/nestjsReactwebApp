// import React from 'react'

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import Modal from "./Modal"
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'

// const ASPECT_RATIO = 1.2
// const MIN_HEIGHT = 150
// const MIN_WIDTH = 200

interface imageCropperTypes<T> {
    isUpload : boolean
    handleUploadModal :  () => void
    setData : React.Dispatch<React.SetStateAction<T>>;
    aspectRatio : number
    minHeight : number
    minWidth : number
    dataName : string
}

const ImageCropper = <T,>({isUpload, handleUploadModal, setData, aspectRatio, minHeight, minWidth, dataName} : imageCropperTypes<T>) => {

    const imageInput = useRef<HTMLInputElement>(null)

    const imgRef = useRef<HTMLImageElement>(null)

    const handleClickPhoto = () => {
        if(imageInput.current){
          imageInput.current.click()
        }
      }

    const [crop, setCrop] = useState<Crop>()

    const [imgSrc, setImgSrc] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [imgError, setImgError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const handleImage = (event : ChangeEvent<HTMLInputElement> ) => {
      const files = event.target.files?.[0]
      // const inputName = event.target.id
  
      console.log(files)
      if(!files) return;
  
      setImgName(files.name)
  
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setIsLoading(true)
        const imageElement = new Image()
        const imageUrl = reader.result?.toString() || ""
        imageElement.src = imageUrl
  
        imageElement.addEventListener("load", () => {
          if(imgError) setImgError('')
          const { naturalWidth, naturalHeight } = imageElement;
          if(naturalHeight < minHeight || naturalWidth < minWidth){
            setImgError('Image must be at least 200 X 150 pixels')
            return setImgSrc('') 
          }
        })
        setIsLoading(false)
        setImgSrc(imageUrl)
      })
  
      reader.readAsDataURL(files)
  
      // if(files){
      //   setData(prevData => ({
      //     ...prevData,
      //     [inputName] : files[0]
      //   }))
      // }
    }

    const onImageLoad = (event : React.SyntheticEvent<HTMLImageElement>) => {
        const {width, height} = event.currentTarget
        // const cropWidthDyna = (MIN_WIDTH / width) * 100
        // const dropHeightDyna = (MIN_HEIGHT / height) * 100
        
        const crop = makeAspectCrop(
          {
            unit : 'px',
            width : minWidth,
            height : minHeight
          },
          aspectRatio,
          width,
          height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
      }

      // Function to handle image cropping and convert it to a Blob
const handleCropImage = (crop : Crop) => {
    if (!imgRef.current || !crop.width || !crop.height) {
      return;
    }
  
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;
  
    // canvas.width = cropWidth;
    // canvas.height = cropHeight;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";
      ctx.save();
  
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
  
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], imgName, { type: blob.type });
          setData((prevData) => ({
            ...prevData,
            [dataName]: file,
          }));
          handleUploadModal(); // Close the upload modal
          setImgSrc('')
          setImgName('')
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    if(!isUpload){
        setImgSrc('')
        setImgName('')
      }
  }, [isUpload])
      

  return (
     <Modal className="h-[82vh] w-full md:w-[700px]" isOpen={isUpload} onClick={handleUploadModal}>
        
     <div className="w-full h-full px-10 py-10 flex flex-col gap-2">
       <div className="w-full flex items-center gap-2">
           <input type="file" id="devImage" ref={imageInput} accept="image/jpeg" className="hidden" onChange={handleImage}/>
           <button type="button" className="bg-indigo-600 h-[35px] px-5 rounded-[8px] text-white" onClick={handleClickPhoto}>{imgName ? 'Change' : 'Choose'} Photo</button>
           <h5 className="">{imgName ? imgName : 'No image choosen'}</h5>
       </div>
       <div className="h-[440px] bg-gray flex justify-center items-center">
         {imgSrc &&
           (!isLoading ?
             <ReactCrop crop={crop} onChange={(pixelCrop) => setCrop(pixelCrop)} keepSelection aspect={aspectRatio} minWidth={minWidth} minHeight={minHeight}>
               <img ref={imgRef} src={imgSrc} className="h-[440px]" onLoad={onImageLoad}/>
             </ReactCrop>
             :
             <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-500 border-t-transparent"></div>
           )
         }
       </div>
         <h5 className="text-red-500 text-xs">{imgError && imgError}</h5>
       <div className="flex justify-end gap-6">
         <button type="button" className="h-[35px] w-fit px-5 flex justify-center items-center bg-black/40 border border-black bg-gray rounded-[8px]" onClick={handleUploadModal}>Cancel</button>
         <button type="button" className="h-[35px] w-fit px-5 flex justify-center items-center bg-indigo-600 rounded-[8px] text-white" 
           onClick={() => {crop && handleCropImage(crop)}}
         >Crop Image</button>
       </div>
     </div>
   </Modal>
  )
}

export default ImageCropper