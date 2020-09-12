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
import {Colors} from '../theme';
import Hedear from '../components/base/Header';
import SmallButton from '../components/base/SmallButton';
import Icon from '../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {sendMsg, getLiveOrders, setSelectedOrder} from '../redux/action';
import SockJsClient from 'react-stomp';
import config from '../redux/config';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import noOrder from '../assets/no_order.png';
const {height, width} = Dimensions.get('window');
import DrawerHeader from '../components/header/DrawerHeader';
// import WS from 'react-native-websocket';

const LiveOrderList = props => {
  console.log('Props >>>>', props);
  let ws = null;
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  let socketRef = null;
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
    if (props.selectedOrder) {
      if (props.selectedOrder.orderStatus === 'COLLECTING') {
        props.navigation.push('AcceptOrderOTP');
      }

      if (props.selectedOrder.orderStatus === 'INPROGRESS') {
        props.navigation.push('CurrentOrderPage');
      }
    }

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

  const sendMessageBySocket = () => {
    socketRef.sendMessage(
      '/app/chat/rahul',
      JSON.stringify({
        fromLogin: 'rahul1',
        message: 'This is test message',
      }),
    );
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
                <View style={{width: 20}} />
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
    // console.log('Item', item);

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
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>Mobile Numbers</Text>
              <Text style={styles.valueText} numberOfLines={1}>
                {item.fromMobileNumber}
              </Text>
            </View>
            <View style={styles.acceptButtonParent}>
              {!props.selectedOrder ? (
                <>
                  <SmallButton
                    buttonStyle={styles.declineButton}
                    text={'Decline'}
                    onPress={() => {
                      // socketRef.sendMessage(
                      //   '/app/chat/rahul',
                      //   JSON.stringify({
                      //     fromLogin: 'rahul1',
                      //     message: 'This is test message',
                      //   }),
                      // );
                      // const request = {message: 'Test Message', from: 'rahul'};
                      // const socket = io('http://localhost:8080', {
                      //   transports: ['websocket', 'polling'],
                      // });
                      // socket.on('connect', () => {
                      //   console.log('connected');
                      // });
                      // const socket = io('http://localhost:8080', {
                      //   transports: ['websocket', 'polling'],
                      //   // extraHeaders: {
                      //   //   Authorization:
                      //   //     'bearer b6fc3071-b94d-4e69-b851-6991077fe92d',
                      //   // },
                      // });
                      // socket.on('/topic/message/rahul', msg => {
                      //   // this.setState({ chatMessages: [...this.state.chatMessages, msg]
                      // });
                      // socket.on('connect', () => {
                      //   console.log('connected');
                      // });
                      // socket.on('connect_error', error => {
                      //   console.log('Error:::', JSON.stringify(error));
                      // });
                      // io.connect('http://localhost:8080/chat/rahul', {
                      //   reconnection: true,
                      //   reconnectionDelay: 500,
                      //   jsonp: false,
                      //   reconnectionAttempts: Infinity,
                      //   transports: ['websocket'],
                      //   extraHeaders: {
                      //     Authorization:
                      //       'bearer b6fc3071-b94d-4e69-b851-6991077fe92d',
                      //   },
                      // });
                      // that.stompClient.subscribe('/queue/update', message => {
                      //   const data = JSON.parse(message.body);
                      //   // Some code here
                      // });
                      // const socket = io('http://localhost:8080', {
                      //   extraHeaders: {
                      //     Authorization:
                      //       'bearer b6fc3071-b94d-4e69-b851-6991077fe92d',
                      //   },
                      // });
                      // socket.connect();
                      // socket.on('app', msg => {
                      //   console.log('Message', msg);
                      // });
                      // props.sendMsg(request);
                    }}
                  />
                  <View style={{width: 10}} />
                </>
              ) : null}
              <SmallButton
                buttonStyle={styles.acceptButton}
                text={props.selectedOrder ? 'Continue' : 'Accept'}
                onPress={() => {
                  props.setSelectedOrder(item);

                  console.log('item.orderStatus ', item.orderStatus);

                  if (item.orderStatus === 'ASSIGNED') {
                    props.navigation.push('AcceptOrderDetails');
                  } else if (item.orderStatus === 'INPROGRESS') {
                    props.navigation.push('CurrentOrderPage');
                  } else {
                    props.navigation.push('AcceptOrderOTP');
                  }
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.root}>
      <DrawerHeader {...props} />

      <View style={styles.subParent}>
        <Hedear
          text={'Current Order'}
          style={{fontSize: 20, marginVertical: 10}}
        />

        <FlatList
          data={
            loading
              ? DATA
              : props.orderList && props.orderList.length > 0
              ? props.orderList
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

        {!loading && (!props.orderList || props.orderList.length === 0) ? (
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              alignSelf: 'center',
              top: height / 4,
            }}>
            <Image
              source={noOrder}
              style={{height: 200, width: 200, tintColor: '#C6CBCE'}}
            />
            <Text
              style={{
                color: '#C6CBCE',
                fontFamily: 'ProzaLibre-Medium',
                fontSize: 18,
              }}>
              No Order Available
            </Text>
          </View>
        ) : null}
      </View>

      <SockJsClient
        url={config.SERVER_URL + 'chat'}
        topics={['/topic/messages/' + props.userDetails.username]}
        // headers={{Authorization: 'bearer b6fc3071-b94d-4e69-b851-6991077fe92d'}}
        onConnect={() => {
          console.log('connected');
        }}
        onDisconnect={() => {
          console.log('Disconnected');
        }}
        onMessage={msg => {
          console.log('onMessage :::', msg);
          props.getLiveOrders(false);
        }}
        onConnectFailure={msg => {
          console.log('onConnectFailure :::', msg);
        }}
        ref={client => {
          socketRef = client;
        }}
        debug={true}
        // autoReconnect={false}
      />
    </View>
  );
};

// export default LiveOrderList;

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  orderList: state.order.orderList,
  isFetching: state.app.isFetching,
  selectedOrder: state.order.selectedOrder,
});

// export default SearchLocation;
export default connect(
  mapStateToProps,
  {
    sendMsg,
    getLiveOrders,
    setSelectedOrder,
  },
)(LiveOrderList);
const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'rgba(245,245,245,1)'},
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
  navBarStyle: {
    height: 60,
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subParent: {flex: 1, paddingHorizontal: 16},
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
  declineButton: {flex: 1, backgroundColor: Colors.appRed},
  acceptButton: {flex: 1, backgroundColor: Colors.appGreen},
  logoStyle: {
    height: 60,
    resizeMode: 'contain',
    width: '40%',
  },
});
