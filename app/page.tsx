import styles from './page.module.css'

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users',
    { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className={styles.main}>
      <h1 className="blue-text text-darken-2">Hello new project</h1>
      {data.map((item: any) => <div key={item.id}>{item.name}</div>)}
    </main>
  );
}



