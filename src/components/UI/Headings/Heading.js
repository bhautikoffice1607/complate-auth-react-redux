import React from 'react';
import styled, { css } from 'styled-components';

const baseStyle = css`
  color: ${({ color }) =>
        color === 'white' ? 'var(--color-white)' : 'var(--color-main)'};
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  margin-top: 0;
  letter-spacing: 1px;
  margin-bottom: ${({ noMargin }) => (noMargin ? '0rem' : '30px')};
`;

const Heading1 = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
  ${baseStyle}
`;

const Heading2 = styled.h2`
  font-size: 35px;
  ${baseStyle}
`;

const Heading3 = styled.h3`
  font-size: 30px;
  ${baseStyle}
`;

const Heading4 = styled.h4`
  font-size: 28px;
  ${baseStyle}
`;

const Heading5 = styled.h5`
  font-size: 24px;
  ${baseStyle}
`;

const Heading6 = styled.h6`
  font-size: 20px;
  ${baseStyle}
`;

const Heading = ({ children, color, noMargin, bold, size }) => {
    if (size === 'h1')
        return (
            <Heading1 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading1>
        );

    if (size === 'h2')
        return (
            <Heading2 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading2>
        );

    if (size === 'h3')
        return (
            <Heading3 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading3>
        );

    if (size === 'h4')
        return (
            <Heading4 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading4>
        );
    if (size === 'h5')
        return (
            <Heading5 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading5>
        );
    if (size === 'h6')
        return (
            <Heading6 noMargin={noMargin} bold={bold} color={color}>
                {children}
            </Heading6>
        );
};

export default Heading;
