// Burger.styled.js
import styled from 'styled-components';

export const StyledBurger = styled.button`
    position: fixed;
    top: 0;
    right: 0; // Changed to right side
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.primaryDark};
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;

    span {
        display: block;
        width: 25px;
        height: 2px;
        margin: 2px;
        background: #FFFFFF;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: center;

        &:first-child {
            transform: ${({ open }) => open ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
        }

        &:nth-child(2) {
            opacity: ${({ open }) => open ? '0' : '1'};
            transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
        }

        &:nth-child(3) {
            transform: ${({ open }) => open ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)'};
        }
    }

    &:hover span {
        background: ${({ theme }) => theme.primaryHover};
    }
`;