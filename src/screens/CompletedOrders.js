/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  RefreshControl,
  Text,
  Dimensions,
} from 'react-native';

import DrawerHeader from '../components/header/DrawerHeader';
import Hedear from '../components/base/Header';
import noOrder from '../assets/no_order.png';
const {height} = Dimensions.get('window');
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {getLiveOrders} from '../redux/action';
import SmallButton from '../components/base/SmallButton';

const CompletedOrders = props => {
  console.log('Props >>>>', props);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-ff96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-ff00-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    getCurrentOrder();
  }, []);

  const getCurrentOrder = async () => {
    setLoading(true);
    await props.getLiveOrders(false);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefresh(true);
    const {error, response} = await props.getLiveOrders(false);
    setRefresh(false);
  };

  const loaderItem = () => {
    return (
      <View style={styles.item}>
        <View style={{width: '100%'}}>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row'}}>
              <SkeletonPlaceholder.Item width={60} height={60} />
              <SkeletonPlaceholder.Item marginLeft={10}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={5}
                  borderRadius={4}
                  marginTop={20}
                />
                <SkeletonPlaceholder.Item
                  width={220}
                  height={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </View>
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <View style={{width: '100%'}}>
              <SkeletonPlaceholder.Item
                height={1}
                marginLeft={70}
                marginRight={0}
              />
            </View>
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row'}}>
              <SkeletonPlaceholder.Item marginLeft={70}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={5}
                  borderRadius={4}
                  marginTop={20}
                />
                <SkeletonPlaceholder.Item
                  width={220}
                  height={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{width: '100%', marginTop: 16}}>
              <SkeletonPlaceholder.Item
                height={1}
                marginLeft={70}
                marginRight={0}
              />
            </View>
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row'}}>
              <SkeletonPlaceholder.Item marginLeft={70}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={5}
                  borderRadius={4}
                  marginTop={20}
                />
                <SkeletonPlaceholder.Item
                  width={220}
                  height={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{width: '100%', marginTop: 16}}>
              <SkeletonPlaceholder.Item
                height={1}
                marginLeft={70}
                marginRight={0}
              />
            </View>
          </SkeletonPlaceholder>

          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginLeft: 70,
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <View style={{flex: 1}}>
                  <SkeletonPlaceholder.Item
                    height={32}
                    marginRight={0}
                    marginLeft={0}
                  />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  };

  const getListItem = (item, index) => {
    // console.log('index', index);
    console.log('Item', item);

    if (loading) {
      return loaderItem(item, index);
    } else {
      return (
        <View style={styles.item}>
          <View style={{width: 60}}>
            <View style={styles.indexParent}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>From Location</Text>
              <Text style={styles.valueText} numberOfLines={2}>
                {item.fromAddress.fullAddress}
              </Text>
            </View>
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>To Location</Text>
              <Text style={styles.valueText} numberOfLines={2}>
                {item.toAddress.fullAddress}
              </Text>
            </View>

            <View style={styles.dateParent}>
              <View style={{flex: 1}}>
                <Text style={styles.labelText}>Total Cost</Text>
                <Text style={styles.valueText} numberOfLines={1}>
                  {'₹ ' + parseFloat(item.finalAnount).toFixed(2)}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.labelText}>Delivered At</Text>
                <Text style={styles.valueText} numberOfLines={1}>
                  {'23 Sep 2020'}
                </Text>
              </View>
            </View>

            <View style={styles.acceptButtonParent}>
              <SmallButton
                text={'View Details'}
                buttonStyle={{marginRight: 10, width: '95%'}}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerHeader {...props} />
      <View style={styles.subParent}>
        <Hedear
          text={'Completed Order'}
          style={{fontSize: 20, marginVertical: 10}}
        />

        <FlatList
          data={
            loading
              ? DATA
              : props.completedOrderList && props.completedOrderList.length > 0
              ? props.completedOrderList
              : []
          }
          renderItem={({item, index}) => getListItem(item, index)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            !props.isFetching ? (
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => onRefresh()}
              />
            ) : null
          }
        />

        {!loading && props.completedOrderList.length === 0 ? (
          <View style={styles.noOrderPayment}>
            <Image
              source={noOrder}
              style={{height: 200, width: 200, tintColor: '#C6CBCE'}}
            />
            <Text style={styles.noOrderText}>No Order Available</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

// export default CompletedOrders;

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  completedOrderList: state.order.completedOrderList,
  isFetching: state.app.isFetching,
});
export default connect(
  mapStateToProps,
  {getLiveOrders},
)(CompletedOrders);
const styles = StyleSheet.create({
  subParent: {flex: 1, paddingHorizontal: 16},
  noOrderPayment: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    top: height / 4,
  },
  noOrderText: {
    color: '#C6CBCE',
    fontFamily: 'ProzaLibre-Medium',
    fontSize: 18,
  },

  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 5,
    height: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  indexParent: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(238,238,238,1)',
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 18,
    fontFamily: 'ProzaLibre-Medium',
  },

  listSubItem: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(207,212,215,1)',
  },
  labelText: {
    fontSize: 10,
    fontFamily: 'ProzaLibre-Regular',
    color: 'rgba(134,148,155,1)',
  },
  valueText: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'ProzaLibre-Regular',
  },
  acceptButtonParent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },

  logoStyle: {
    height: 60,
    resizeMode: 'contain',
    width: '40%',
  },
  dateParent: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(207,212,215,1)',
    flexDirection: 'row',
  },
});
