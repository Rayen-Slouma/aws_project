// Menu.styled.js
import styled from 'styled-components';

export const StyledMenu = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.primaryDark};
    height: auto;
    padding-top: 60px;
    text-align: left;
    transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    nav {
        padding: 1rem;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        margin: 0.5rem 0;
    }

    a {
        display: flex;
        align-items: center;
        font-size: 1rem;
        text-transform: uppercase;
        padding: 1rem 0;
        font-weight: bold;
        letter-spacing: 0.1rem;
        color: #FFFFFF;
        text-decoration: none;
        transition: color 0.3s linear;

        span {
            margin-right: 1rem;
            font-size: 1.2rem;
        }

        &:hover {
            color: ${({ theme }) => theme.primaryHover};
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;

        a {
            font-size: 0.9rem;
            padding: 0.8rem 0;
        }
    }
`;