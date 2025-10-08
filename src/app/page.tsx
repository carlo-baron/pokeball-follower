"use client";

import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';
import { 
  useState,
  useEffect,
} from "react";
import { 
  motion,
} from 'motion/react';
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material/';
import PokeballScene from './components/PokeballScene';
import { mons } from './utils/mons';
import {useRouter} from 'next/navigation';

type pokemon = {
  name: string;
  sprite: string;
}

export default function App() {
  const [show, setShow] = useState<boolean>(false);
  const [childrenComplete, setChildrenComplete] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<pokemon[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
  const result: pokemon[] = [];

  async function fetchMons() {
    for (const url of mons) {
      try {
        const res = await fetch(url);
        const data = await res.json();

        result.push({
          name: data.name,
          sprite:
            data.sprites?.other?.['official-artwork']?.front_default ||
            data.sprites?.front_default,
        });
      } catch (err) {
        console.error(`Failed to fetch ${url}:`, err);
      }
    }

    setPokemons(result);
    setLoaded(true);
  }


  fetchMons();
  setMounted(true);
}, []);
  
  const containerVariants = {
    initial: {
      y: 0
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      }
    },
    moveUp: {
      y: -15,
      transition: {
        duration: 0.5,
      }
    }
  };

  const childVariants = {
    initial: {
      x: 100,
      y: 100,
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleChildrenComplete = () => {
    setChildrenComplete(true);
  };

  if(!mounted) return null;

  if(!loaded) return <CircularProgress className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'/>

  const mappedPokemon = pokemons.map((pokemon, index) => {
    return(
      <ToggleButton 
      key={index}
      value={pokemon.name}
      className='flex flex-col'
      >
        <img 
        src={pokemon.sprite}
        alt={pokemon.name}
        className='w-20 h-fit'
        />
        <Typography
        sx={{fontSize: '12px'}}
        >
          {pokemon.name}
        </Typography>
      </ToggleButton>
    );
  });

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className="main flex flex-col gap-4 p-4 items-center">
        <motion.span
          className='flex gap-2'
          variants={containerVariants}
          initial='initial'
          animate={childrenComplete ? ['animate', 'moveUp'] : 'animate'}
          onAnimationComplete={() => childrenComplete && setShow(true)}
        >
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >W</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >E</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >L</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >C</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >O</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
          >M</motion.span>
          <motion.span
            variants={childVariants}
            className='text-4xl font-bold'
            onAnimationComplete={handleChildrenComplete}
          >E</motion.span>
        </motion.span>
        {show && (
          <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          >
            <Button
              variant='contained'
              onClick={() => setPlay(true)}
            >
              PLAY
            </Button>
            <Dialog
            open={play}
            onClose={() => setPlay(false)}
            >
              <DialogTitle>
                Choose Pokemon
              </DialogTitle>
              <DialogContent
              >
                <ToggleButtonGroup
                orientation='vertical'
                className='grid grid-cols-5'
                value={selected}
                exclusive
                onChange={(_, newSelected) => setSelected(newSelected)}
                sx={{
                  display: 'grid !important'
                }}
                >
                  {mappedPokemon}
                </ToggleButtonGroup>
              </DialogContent>
              <DialogActions>
                <Button
                onClick={()=>{
                  if(!selected) return;
                  router.push(`/play/${selected}`)
                }}
                >
                  Choose
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </div>
      <div className="absolute bottom-50 left-[50%] translate-[-50%]">
        <PokeballScene />
      </div>
    </div>
  );
}

