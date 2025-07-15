import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: '100vw', opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: '-100vw', opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.6,
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{ height: '100vh', overflow: 'hidden' }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;