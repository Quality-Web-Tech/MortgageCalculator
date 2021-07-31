import React from 'react'
import {FlatList as NativeList} from 'react-native'

export default function FlatList({listItem, ...props}) {
  return (
    <NativeList
      windowSize={5}
      renderItem={({item}) => listItem(item)}
      keyExtractor={item => item.label}
      horizontal={false}
      {...props}
    />
  )
}
