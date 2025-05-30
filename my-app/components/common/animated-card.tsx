'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const AnimatedCard = ({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          scale: 1.03,
          rotate: 0.5,
          background: "linear-gradient(135deg, #6366f1, #ec4899)",
          color: "#ffffff",
          boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
        className="rounded-2xl shadow-lg bg-white hover:cursor-pointer"
      >
        <Card className="bg-transparent shadow-none">
          <CardContent className="p-6 space-y-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-black">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default AnimatedCard;
