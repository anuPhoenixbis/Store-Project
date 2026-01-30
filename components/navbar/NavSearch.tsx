'use client'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

function NavSearch() {
  const searchParams = useSearchParams()//reads the search params
  const {replace} = useRouter()
  const [search,setSearch] = useState(searchParams.get('search')?.toString() ?? '');
  // debounced callback takes 2 necessary args : the function containing what we wanna do and the time delay between each run
  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams)
    if(value){
      params.set('search',value)//sets the search to the current value
    }else{
      params.delete('search')//or else deletes the search values if value is empty string 
    }
    replace(`/products?${params.toString()}`)//redirects to the url provided
  },500)

  useEffect(()=>{
    if(!searchParams.get('search')){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch('')
    }
  },[searchParams])//each time the search value in the searchParams changes this useEffect runs
  return (
    <Input 
      type="search" 
      placeholder='search product...' 
      className='max-w-xs dark:bg-muted'
      value={search}
      onChange={(e)=>{
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  )
}

export default NavSearch