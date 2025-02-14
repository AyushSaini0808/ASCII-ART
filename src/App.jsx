import {useRef, useState} from 'react'
import {galleryItems} from "./assets/gallery.js";
import {Upload, Download, Image as ImageIcon} from "lucide-react";
import {GallerySection} from "./components/GallerySection.jsx";
import UploadSection from "./components/UploadSection.jsx";
import AsciiArtPreview from "./components/AsciiArtPreview.jsx";

function App() {
    //Stores the generated ASCII art as a string
    const [asciiArt, setAsciiArt] = useState("")
    // Stores the uploaded image file(excluding extension)
    const [fileName, setFileName] = useState("")
    // Stores the data URL of the uploaded image for preview purposes and can be used for rendering a preview of the image in the UI
    const [imagePreview, setImagePreview] = useState("");
    // Stores the index of the gallery feature
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
    // Gets the canvas for rendering the ASCII art
    const canvasRef = useRef(null)
    // ASCII Char array stores characters in descending order of pixel coverage or the gray ramp
    const asciiChar = ["@", "%", "#", "S", "%", "0", "?", "*", "+", ";", ":", ",", "."," "]
    const generateAsciiArt = (image, width = 100) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const scaleFactor = width / image.width;
        const height = Math.floor(image.height * scaleFactor)
        canvas.width = width;
        canvas.height = height;

        try {
            ctx.drawImage(image, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height)
            const pixels = imageData.data;
            let ascii = " ";
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    const idx = (i * width + j) * 4;
                    const brightness = Math.floor(
                        (pixels[idx] * 0.21 + pixels[idx + 1] * 0.72 + pixels[idx + 2] * 0.07)
                    );
                    const charIndex = Math.floor(
                        (brightness * (asciiChar.length - 1)) / 255
                    );
                    ascii += asciiChar[charIndex];
                }
                ascii += '\n';
                setAsciiArt(ascii)
            }
        } catch (error) {
            console.log("Error generating ASCII Art: ", error);
            setAsciiArt("Error: Could not process image , please try uploading an image instead")
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFileName(file.name.split('.')[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                setImagePreview(image.src);
                generateAsciiArt(image);
            };
            image.src = e.target?.result;
        };
        reader.readAsDataURL(file);
    };

    const downloadAsciiArt = () => {
        const element = document.createElement('a');
        const file = new Blob([asciiArt], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${fileName || 'ascii-art'}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const loadGalleryImage = async (imageUrl) => {
        try {
            // Create a blob URL from the image to avoid CORS issues
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                setImagePreview(imageUrl); // Keep original URL for display
                generateAsciiArt(image);
            };
            image.src = blobUrl;
        } catch (error) {
            console.error('Error loading gallery image:', error);
            setAsciiArt('Error: Could not load gallery image. Please try uploading the image instead.');
        }
    };
    return (
        <>
            <div
                className={"min-h-screen bg-[#0A0F1C] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.3),rgba(255,255,255,0))]"}>
                <div className={"container mx-auto px-3 py-12"}>
                    <div className={"max-w-[80vw] text-center mx-auto"}>
                        <h1 className={"text-5xl mb-4 tracking-wider font-bold text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-blue-600"}>Pixel Poet</h1>
                        <p className={"text-white/40 text-xl "}>Transform your text into beautiful ASCII Art</p>
                        <GallerySection  currentGalleryIndex={currentGalleryIndex} setCurrentGalleryIndex={setCurrentGalleryIndex} onImageSelect={loadGalleryImage}/>
                        <UploadSection onImageUpload={handleImageUpload}/>
                        <AsciiArtPreview onDownload={downloadAsciiArt} imagePreview={imagePreview} asciiArt={asciiArt}/>

                        <canvas ref={canvasRef} className={"hidden"}/>
                        <p className="text-gray-400 mt-4">
                            Create stunning ASCII art from your images in seconds.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Your art will be generated instantly and ready to download.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
