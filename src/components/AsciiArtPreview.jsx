import React from 'react';
import { Download } from 'lucide-react';
import PropTypes from 'prop-types';

const AsciiArtPreview = ({ asciiArt, onDownload, imagePreview }) => {
    if (!imagePreview) return null;
    return (
        <div className="space-y-6">
            {/* ASCII Art Preview */}
            <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                <h3 className="text-gray-600 font-medium mb-3 text-center">ASCII Art</h3>
                <div className="max-h-[80vh] rounded-lg overflow-auto bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <pre className="font-mono text-[8px] leading-[8px] md:text-[10px] md:leading-[10px] lg:text-[12px] lg:leading-[12px] text-black whitespace-pre">
            {asciiArt}
          </pre>
                </div>
            </div>

            <button
                onClick={onDownload}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
                <Download className="w-5 h-5" />
                Download ASCII Art
            </button>
        </div>
    );
};

AsciiArtPreview.propTypes = {
    asciiArt: PropTypes.string,
    onDownload: PropTypes.func,
    imagePreview: PropTypes.string,
};

export default AsciiArtPreview;
