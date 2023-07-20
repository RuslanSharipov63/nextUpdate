"use client"
import styles from './page.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect } from 'react';
import { PhotoListAsyncThunk } from '@/store/PhotoListSlice';
import PhotoList from '@/components/PhotoList';



export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(state => state.PhotoListSlice)

  useEffect(() => {
    dispatch(PhotoListAsyncThunk())
  }, [])



  console.log(list)
  return (
    <main className={styles.main}>
      {loading === 'pending' && <p>Идет загрузка...</p>}
      {loading === 'failed' && <p>Произошла ошибка</p>}
      {loading === 'succeeded' && <PhotoList list={list} />}
    </main>
  );
}



