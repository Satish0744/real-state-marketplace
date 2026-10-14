import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

const PropertyGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-3">
        <div className="relative rounded-2xl overflow-hidden group">
          <motion.img
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={images[current]}
            alt="Property"
            className="w-full h-[300px] md:h-[500px] object-cover"
          />
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <Expand size={18} />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
            {current + 1} / {images.length}
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative rounded-lg overflow-hidden aspect-square ${
                current === i ? 'ring-2 ring-primary-600' : 'opacity-70 hover:opacity-100'
              } transition-all`}
            >
              <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <X size={28} />
            </button>
            <button
              onClick={prev}
              className="absolute left-6 text-white p-3 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
            <img
              src={images[current]}
              alt="Property"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={next}
              className="absolute right-6 text-white p-3 hover:bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              {current + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyGallery;