import { View, StyleSheet, Button, Image, ScrollView, Text, Dimensions } from "react-native";
import React from 'react';
import { useEffect, useState } from "react";
import { fetchListTours } from "../Api";
import TourItem from './TourItem';

var {width,height} = Dimensions

const ListTours = ({ category }) => {

    const [tours, setTours] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTours = async () => {
          try {
            const allTours = await fetchListTours();
            if (!Array.isArray(allTours)) {
              throw new Error('Invalid data format');
            }
            // Verificamos si tourCategory es un objeto y tiene una propiedad 'name'
            const filteredTours = allTours.filter(tour => tour.tourCategory && tour.tourCategory.name === category);
            setTours(filteredTours);
          } catch (error) {
            console.error('Error fetching tours:', error);
            setError(error.message);
          }
        };

        fetchTours();
      }, [category])

      if (error) {
        return <Text>{error}</Text>;
      }


      return (
        <View>
        <ScrollView>
          {tours.map(tour => (
            <TourItem key={tour.id} tour={tour} />
          ))}
        </ScrollView>
        </View>
      );
}

export default ListTours;
