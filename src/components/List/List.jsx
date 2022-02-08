import { useState } from 'react'

function List () {
  const [search, setSearch] = useState({ search: '' })
  const items = ['hola', 'esto', 'es', 'una', 'prueba', 'para', 'michelada', '.io']

  const existMatch = search?.match?.length > 0

  const lookForText = e => {
    const text = e.target.value
    if (text === '') setSearch({ search: '' })
    else {
      const plainSearch = text.toLowerCase().trim().split(' ').join('')
      const validSearch = items.filter(item => item.indexOf(plainSearch) !== -1)
      setSearch({
        search: text,
        match: validSearch.length > 0 ? validSearch : ['No hay ningún item ;((']
      })
    }
  }

  const RenderListItem = ({ item }) => {
    return (
      <li className='text-2xl capitalize text-left py-2'>
        {item}
      </li>
    )
  }

  return (
    <section className='grid place-items-center w-screen h-full mt-20'>
      <div className='bg-white rounded-xl p-10 text-center'>
        <h1 className='text-4xl font-bold text-slate-500'>
          🎉 Testing List with <code className='underline'> React</code> 🎉
        </h1>
        <input
          className='px-8 py-4 w-full border border-slate-500 rounded my-10'
          type='text'
          value={search.search}
          onChange={lookForText}
          placeholder='Search'
        />
        <ul data-testid='list-component'>
          {
            existMatch
              ? search.match.map((item, id) =>
                <RenderListItem item={item} key={id} />
                )
              : items.map((item, id) =>
                <RenderListItem item={item} key={id} />
              )
          }
        </ul>
      </div>
    </section>
  )
}

export default List
