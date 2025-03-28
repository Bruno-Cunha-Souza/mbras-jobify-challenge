import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ButtonFavProps {
  jobId: number;
  isFavorited: boolean;
  onFavoriteToggle: (id: number, isFavorited: boolean) => void;
}

const ButtonFav: React.FC<ButtonFavProps> = ({ jobId, isFavorited, onFavoriteToggle }) => {
  const [isChecked, setIsChecked] = useState(isFavorited);

  useEffect(() => {
    setIsChecked(isFavorited);
  }, [isFavorited]);

  const handleFavoriteToggle = async () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    try {
      // Busca o token no cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        // Se o token não for encontrado, exibe uma mensagem e pergunta se deseja fazer login
        const userConfirmed = window.confirm("Você não está logado. Deseja fazer login?");
        if (userConfirmed) {
          // Redireciona para a página de login usando window.location.href
          window.location.href = "/user";
        }
        // Retorna para não tentar fazer a requisição sem o token
        return;
      }

      // Envia a requisição para favoritar/desfavoritar
      await fetch(`http://localhost:3001/api/jobs/${jobId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      onFavoriteToggle(jobId, newIsChecked);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      setIsChecked(isChecked);
    }
  };

  return (
    <StyledWrapper>
      <label className="ui-bookmark">
        <input type="checkbox" checked={isChecked} onChange={handleFavoriteToggle} />
        <div className="bookmark">
          <svg viewBox="0 0 16 16" style={{ marginTop: 4 }} className="bi bi-heart-fill" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" fillRule="evenodd" />
          </svg>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ui-bookmark {
    --icon-size: 24px;
    --icon-secondary-color: rgb(136, 136, 136);
    --icon-hover-color: rgb(97, 97, 97);
    --icon-primary-color: rgb(252, 54, 54);
    --icon-circle-border: 1px solid var(--icon-primary-color);
    --icon-circle-size: 35px;
    --icon-anmt-duration: 0.3s;
  }

  .ui-bookmark input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
  }

  .ui-bookmark .bookmark {
    width: var(--icon-size);
    height: auto;
    fill: var(--icon-secondary-color);
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bookmark::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 30px 0 -4px var(--icon-primary-color), 30px 0 0 -4px var(--icon-primary-color);
    transform: scale(0);
    padding: 1px;
  }

  .ui-bookmark:hover .bookmark {
    fill: var(--icon-hover-color);
  }

  .ui-bookmark input:checked + .bookmark {
    fill: var(--icon-primary-color);
    animation: bookmark var(--icon-anmt-duration) forwards;
  }

  @keyframes bookmark {
    50% {
      transform: scaleY(0.6);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

export default ButtonFav;
