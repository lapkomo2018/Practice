import {Button, Card} from "react-bootstrap";
import React from "react";

export default function GameBoard({ squares, onClick }: { squares: string[], onClick: any }) {

    const svgX = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="23" y1="1" x2="1" y2="23"></line>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );
    const svgO = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="11"></circle>
        </svg>
    );

    const renderSquare = (i: number) => {
        return (
            <Button className='btn-dark m-1 d-flex justify-content-center align-items-center p-3' onClick={() => onClick(i)} style={{width: '100px', height: '100px'}}>
                {squares[i] === 'X' ? svgX : squares[i] === 'O' ? svgO : null}
            </Button>
        );
    };

    return (
        <Card style={{background: "#4f4f4f"}}>
            <Card.Body>
                <div className='row flex-nowrap'>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className='row flex-nowrap'>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className='row flex-nowrap'>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </Card.Body>
        </Card>
    );
}