import {useState, useCallback} from 'react'

interface Position {
    top: number;
    left: number;
    
}

export const usePosition = () => {
    const [position, setPosition] = useState<Position>({top: 0, left: 0})
    const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
    const [arrowPosition, setArrowPosition] = useState("50%")
    

    const calculatePosition = useCallback((anchorElement: HTMLElement, tooltipElement: HTMLElement) => {
        const anchorRect = anchorElement.getBoundingClientRect();

        const tooltipWidth = tooltipElement.offsetWidth;
        const tooltipHeight = tooltipElement.offsetHeight;

        let top = anchorRect.top - tooltipHeight - 8;
        let left = anchorRect.left + (anchorRect.width / 2) - (tooltipWidth / 2);
        let currentPlacement: 'top' | 'bottom' = 'top';

        if (left < 0) {
            left = tooltipWidth / 2 + 8;
            
            
        }

        

        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - (tooltipWidth / 2) - 8;
            setArrowPosition("80%")
        }

        if (top < 0) {
            top = anchorRect.bottom + 8;
            currentPlacement = 'bottom';
            
        }

        setPosition({top, left})
        setPlacement(currentPlacement)
        
    }, [])
    return {position, placement, calculatePosition, arrowPosition}
}