"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* 모달 본체 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="
              absolute z-50 bg-white w-full

              sm:top-1/2 sm:left-1/2 sm:bottom-auto
              sm:translate-x-[-50%] sm:translate-y-[-50%]
              sm:rounded-2xl sm:shadow-xl sm:w-auto
            "
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GeneralModal;
