import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const UserPdf = ( user ) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: '20px',
      fontFamily: 'Helvetica',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subheading: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    info: {
      fontSize: '14px',
      marginBottom: '10px',
      backgroundColor : 'red',
      width : '200px'
    },
    image: {
     
      width: '80px',
      height: '80px',
      borderRadius: '50%',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.image} src={'/images/user.png'} />
        <View style={styles.section}>
          <Text style={styles.heading}>User Information</Text>
          <View>
            <Text style={styles.subheading}>Name:</Text>
            <Text style={styles.info}>
             Rahul Sharma
            </Text>
          </View>
          <View>
            <Text style={styles.subheading}>Email:</Text>
            <Text style={styles.info}>temp@fam.cc</Text>
          </View>
          <View>
            <Text style={styles.subheading}>Phone:</Text>
            <Text style={styles.info}>011112555</Text>
          </View>
          <View>
            <Text style={styles.subheading}>Address:</Text>
            <Text style={styles.info}>lorem,kad ddd</Text>
          </View>
          <View>
            <Text style={styles.subheading}>Bio:</Text>
            <Text style={styles.info}>Lorem ipsum dolor sit amet.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default UserPdf;
