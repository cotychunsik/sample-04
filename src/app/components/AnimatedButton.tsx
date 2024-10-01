'use client';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface AnimatedButtonProps {
  text: string;
}

const AnimatedButton: FC<AnimatedButtonProps> = ({ text }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}  // 시작 상태
      animate={{ opacity: 1, y: 0 }}   // 애니메이션 상태
      transition={{ duration: 0.5 }}   // 애니메이션 지속 시간
      whileHover={{ scale: 1.1 }}      // 호버 시 확대
      whileTap={{ scale: 0.9 }}        // 클릭 시 축소
      style={{
        width:'180px',
        padding: '20px',
        backgroundColor: '#0070f3',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;
