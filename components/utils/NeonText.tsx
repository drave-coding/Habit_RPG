import React from 'react';
import { Text, TextStyle } from 'react-native';

interface NeonTextProps {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight']; // Allow fontWeight to be passed as a prop
  style?: TextStyle;
}

const NeonText: React.FC<NeonTextProps> = ({
  children,
  fontSize = 20,
  // color = '#a9fef8',
  color = 'white',
  fontWeight = 'bold', // Default fontWeight
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontSize,
          color,
          textShadowColor: color,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
          fontWeight, // Use the fontWeight prop
          textAlign: 'center',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default NeonText;