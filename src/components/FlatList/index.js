import React from 'react'
import {FlatList as NativeList} from 'react-native'

export default function FlatList({ListItem, ...props}) {
  return (
    <NativeList
      windowSize={5}
      renderItem={({item}) => <ListItem data={item} />}
      keyExtractor={item => item.label}
      horizontal={false}
      {...props}
    />
  )
}
