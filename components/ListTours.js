import { View, StyleSheet, Button, Image, ScrollView } from "react-native";
import React from 'react';
import { useEffect, useState } from "react";
import { fetchListTours } from "../Api";
import TourItem from './TourItem';

const ListTours = ({ category }) => {

    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
          try {
            const allTours = await fetchListTours();
            const filteredTours = allTours.filter(tour => tour.tourCategory.name === category);
            setTours(filteredTours);
          } catch (error) {
            console.log(error)
          }
        };

        fetchTours();
      }, [category])


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
