import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface IDataCardProduct {
  name: string;
  price: number;
  cover?: string;
  onClickCard: () => void;
}

const coverDefault = 'https://darkside.vteximg.com.br/arquivos/ids/168433-209-313/139-fragmentos-do-horror.jpg?v=636851507661830000';

export const CardProduct = ({ name, price, cover, onClickCard }: IDataCardProduct) => {
  return (
    <Card sx={{ maxWidth: 210 }}>
      <CardActionArea
        onClick={onClickCard}
      >
        <CardMedia
          component="img"
          height="315"
          image={cover ? cover : coverDefault}
          alt="capa do livro"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};