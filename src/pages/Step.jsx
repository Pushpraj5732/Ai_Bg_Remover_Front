import React from 'react';
import upload from '../assets/upload_icon.svg';
import remove from '../assets/remove_bg_icon.svg';
import download from '../assets/download_icon.svg';

const Step = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Steps to remove background image in seconds
      </h2>

      <div className="grid md:grid-cols-3 gap-10 text-center">
        
        <div>
          <img src={upload} alt="upload" className="mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600">
            This is a demo text, will replace it later.
          </p>
        </div>

        <div>
          <img src={remove} alt="remove" className="mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Remove Background</h3>
          <p className="text-gray-600">
            This is a demo text, will replace it later.
          </p>
        </div>

        <div>
          <img src={download} alt="download" className="mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Download Image</h3>
          <p className="text-gray-600">
            This is a demo text, will replace it later.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Step;
