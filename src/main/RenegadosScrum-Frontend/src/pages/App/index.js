import { Button, Backdrop, Card, CardActions, CircularProgress, CardContent, Paper, Slide, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import Dimensions from "react-dimensions"
import { withRouter } from "react-router-dom"
import { Colors } from "../../constants/Colors"
import { Fonts } from "../../constants/Fonts"
import { DrawerComponent } from '../../drawer/DrawerComponent'
import { isMobile } from "../../utils/isMobile"
import { Container } from "./styles"
import { Doughnut } from 'react-chartjs-2';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import { getUserType } from '../../services/auth'
const useStyles = makeStyles( ( theme ) => ( {
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    flexGrow: 1,
    flexDirection: 'column'

  },
  paper: {
    padding: theme.spacing( 1 ),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  Title: {
    fontFamily: Fonts.Primary
    , fontSize: 14
    , borderRadius: 5
    , fontWeight: 'bold'
    , textAlign: 'center'
    , color: Colors.White
    , padding: 5
    , background: `linear-gradient(90deg, ${ Colors.Primary } 50%, ${ Colors.Primary } 50%)`
    , marginBottom: 10
    , flexWrap: 'wrap'
  },
  CardContent: {
    alignItems: 'center'
    , display: 'flex'
    , flex: 1
    , justifyContent: 'flex-start'
  }
  , ItemTitle: {
    fontFamily: Fonts.Primary
    , fontSize: 17
    , fontWeight: 'bold'
  }
  , ItemContent: {
    fontFamily: Fonts.Primary
    , fontSize: 17
    , marginBottom: isMobile ? '2%' : 10
  },
  ItemOBS: {
    fontFamily: Fonts.Primary
    , fontSize: 16
    , borderRadius: 5
    , fontWeight: 'bold'
    , textAlign: 'center'
    , color: Colors.White
    , padding: 10
    , background: `linear-gradient(90deg, ${ Colors.Black } 50%, ${ Colors.Black } 50%)`
    , marginBottom: 10
    , flexWrap: 'wrap'
  },
} ) )


const TUTORIAL_TYPE_CAUTERFIX = [ {
  Title: 'Procedimento 1 - ASSINATURA ELETR??NICA',
  Content: [ 'O portador da assinatura deve passar para a Cauterfix o arquivo do certificado de extens??o pfx, ou seja, um arquivo com o nome por exemplo: "certificado.pfx".', 'O portador da assinatura deve tamb??m passar a senha de seu certificado a Cauterfix para que o sistema possa assinar automaticamente por ele a cada fechamento de laudo.' ]
  , Obs: null
},
{
  Title: 'Procedimento 2 - PESQUISA COM ERRO',
  Content: [ 'Visualizar pesquisa', 'Pesquisa exibe mensagem de erro?', 'Enviar a numera????o da pesquisa para a autocredcar. ' ]
  , Obs: 'A Autocredcar ao consertar ir?? notificar a pesquisa novamente o que far?? com que nossas bases sejam preenchidas.'
},
{
  Title: 'Procedimento 3 - CRIA????O DO LOGO DO CLIENTE NO LAUDO ',
  Content: [
    'Criar nova logo para o cliente partindo do exemplo no link: https://i.imgur.com/jwwIoyI.png'
    , 'Subir o novo logo no site https://imgur.com/'
    , 'Configurar cada produto do cliente com o link do novo logo que foi gerado ap??s subir a imagem no imgur.'
    , 'Configure a cor do cliente a partir da cor utilizada na barra ap??s cria????o do logo.'
  ]
  , Obs: 'Certifique-se que o link utilizado ?? diretamente o link da imagem, se necess??rio, abra o post no Imgur e clique com o bot??o direito e logo em seguida clique em "abrir imagem em uma nova guia", nessa nova guia ter?? apenas o link da imagem diretamente.'
}
  , {
  Title: 'Procedimento 4 - CLIENTE N??O CONSEGUE LOGAR NO APLICATIVO'
  , Content: [
    'Verificar se existe Play Store no telefone.'
    , 'Verificar se a vers??o do aplicativo condiz com a atual. (Verificar se foi baixado pela Google Play ou por link direto)'
    , 'Reinstala????o da aplica????o.'
  ]
  , Obs: 'SEMPRE QUE CRIAR NOVOS USU??RIOS, TENHA CERTEZA DE QUE ?? POSS??VEL LOGAR COM AQUELE USU??RIO, TESTE DE USU??RIO ?? OBRIGAT??RIO.'
}

]

export function Map ( props )
{
  const classes = useStyles()
  const [ openBackground, setOpenBackground ] = useState( false )



  const [ Procedures, setProcedures ] = useState( [] )

  useEffect( () => { Mount() }, [] )

  async function Mount ()
  {
    await Promise.all( [ GetJobs() ] )
  }

  async function GetJobs ()
  {
    const response = getUserType()

    switch ( parseInt( response ) )
    {
      case 1:
        setProcedures( TUTORIAL_TYPE_CAUTERFIX )
        break;
    }
  }

  return (
    <DrawerComponent
      history={ props.history }
      children={
        <div className={ classes.root }>
          <Typography className={ classes.Title }>Procedimentos</Typography>


          {
            Object.keys( Procedures ).length > 0 &&
            Procedures.map( item =>
              <Slide
                direction="right"
                in={ true }
                mountOnEnter
                unmountOnExit
                timeout={ { appear: 1500, enter: 1500, exit: 500 } }>
                <Paper elevation={ 0 } className={ classes.paper }>
                  <Card
                    className={ classes.root }
                    variant="outlined">

                    <CardContent className={ classes.CardContent }>
                      <BeenhereIcon style={ { color: Colors.Primary, marginRight: 5, fontSize: 30 } } />
                      <div style={ { flex: 1, display: 'flex', alignItems: 'center', } }>
                        <Typography className={ classes.ItemTitle } >{ item.Title }</Typography>
                      </div>
                    </CardContent>

                    <CardActions style={ { flexDirection: 'column', alignItems: 'center', marginBottom: 15, flex: 1, display: 'flex' } }>
                      {
                        item.Content.map( ( subItem, index ) => <Typography className={ classes.ItemContent }>{ `${ index + 1 } - ${ subItem }` }</Typography> )
                      }
                    </CardActions>

                    {
                      item.Obs !== null &&
                      <div style={ { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2%' } }>
                        <Typography className={ classes.ItemOBS }>{ item.Obs.toUpperCase() }</Typography>
                      </div>
                    }

                  </Card>
                </Paper>
              </Slide>
            )
          }

          <Backdrop className={ classes.backdrop } open={ openBackground }>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      } />
  )
}



const DimensionedMap = withRouter( Dimensions()( Map ) )

const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
)

export default App
