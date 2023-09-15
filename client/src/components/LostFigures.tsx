import { FC } from 'react';
import { Figure } from '../figures/Figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className='lost'>
            <h3>{title}</h3>
            {figures.map(figure => {
                return (
                    <div key={figure.id}>   
                        {figure.name} 
                        {figure.logo && <img style={{width: '20px  '}} src={figure.logo} alt={figure.name}/>}
                        
                    </div>
                )
            })}
        </div>
    );
};

export default LostFigures;