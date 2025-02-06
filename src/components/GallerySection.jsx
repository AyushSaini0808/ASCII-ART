import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "../assets/images/gallery.js";

export const GallerySection = ({ currentGalleryIndex, setCurrentGalleryIndex, onImageSelect}) => {
    const handleGalleryNavigation = (direction) => {
        if (direction === 'prev') {
            setCurrentGalleryIndex((prev) =>
                prev === 0 ? galleryItems.length - 1 : prev - 1
            );
        } else {
            setCurrentGalleryIndex((prev) =>
                prev === galleryItems.length - 1 ? 0 : prev + 1
            );
        }
    };

    return (
        <div className={"mt-7 bg-[rgba(120,119,198,0.2)] backdrop-blur-xl shadow-2xl rounded-2xl border-gray-800/40"}>
            <h2 className={"text-white py-4 text-center font-medium text-2xl"}>Gallery</h2>
            <div className={"relative"}>
                <div className={"flex items-center justify-between gap-4"}>
                    <button onClick={() => handleGalleryNavigation("prev")}
                            className={"text-white p-2 rounded-full bg-[rgba(120,119,198,0.3)] text-center hover:bg-[rgba(120,119,198,0.5)] transition-colors mx-4"}
                    ><ChevronLeft /></button>
                    <div className="flex-1 relative">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                            <img
                                src={galleryItems[currentGalleryIndex].image}
                                alt={galleryItems[currentGalleryIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h3 className="text-white font-semibold text-left">
                                    {galleryItems[currentGalleryIndex].title}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleGalleryNavigation("next")}
                            className={"text-white p-2 rounded-full bg-[rgba(120,119,198,0.3)] text-center hover:bg-[rgba(120,119,198,0.5)] transition-colors mx-4"}
                    ><ChevronRight /></button>
                </div>
                <div className="flex justify-center mt-4 gap-2">
                    {galleryItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentGalleryIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentGalleryIndex
                                    ? 'bg-purple-500'
                                    : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
                <div className={"flex relative"}>
                    <button
                        role="button"
                        aria-label="Try this image"
                        onClick={() => onImageSelect(galleryItems[currentGalleryIndex].image)}
                        className={`
            relative
            mx-6 w-full
            py-4 my-5
            text-2xl font-semibold text-white
            bg-gradient-to-t from-purple-600/20 to-pink-600/20
            rounded-lg
            shadow-lg
            hover:scale-105
            hover:shadow-xl
            active:scale-95
            focus:outline-none
            focus:ring-4 focus:ring-purple-400/50
            transition-all
            duration-300
            ease-in-out
            transform
          `}
                    >
                        <span className="relative z-10">Try this image</span>
                        <div
                            aria-hidden="true"
                            className="
              absolute inset-0
              bg-gradient-to-t from-white/10 to-transparent
              rounded-lg
              transition-opacity
              duration-300
              hover:opacity-0
            "
                        />
                    </button>
                </div>
            </div>
        </div>
    )
};

GallerySection.propTypes = {
    currentGalleryIndex: PropTypes.number.isRequired,
    setCurrentGalleryIndex: PropTypes.func.isRequired,
    onImageSelect: PropTypes.func.isRequired,
};
