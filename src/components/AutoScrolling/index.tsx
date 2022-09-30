import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  Easing,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Slider} from '@rneui/base';
import {Icon, Button} from '@rneui/themed';
import useInterval from '../../hook/useInterval';

const AutoScrolling = () => {
  const [value, setValue] = useState(1);
  const [position, setPosition] = useState(1);
  const scrollRef = useRef(null);
  const MAX_HEIGT = Dimensions.get('screen').height;
  const [isBottom, setBottom] = useState(false);
  const scrollAnimate = useRef(new Animated.Value(0)).current;
  const scrollAnimation = useRef(new Animated.Value(0))
  const [contentHeight, setContentHeight] = useState(0)
  const [play, setPlay] = useState<boolean>(false)

  useEffect(() => {
    if(play){
    scrollAnimation.current.addListener((animation) => {
      scrollRef.current &&
        scrollRef.current.scrollTo({
          y: animation.value,
          animated: false,
        })
    })

    if (contentHeight) {
      Animated.timing(scrollAnimation.current, {
        toValue: contentHeight,
        duration: (contentHeight * 100) - value*3000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start()
    }
    console.log(contentHeight)
    console.log(value);
    console.log((contentHeight * 100) - value*1000);
    return () => scrollAnimation.current.removeAllListeners()
}
  }, [contentHeight, play, value])

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const handlePress = () => {
    setPlay(!play)
  };
  console.log("TEST",scrollAnimate)

  return (
    <View>
      <View style={styles.wrapper}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={100}
          minimumValue={10}
          step={10}
          allowTouchTrack
          trackStyle={{height: 5, backgroundColor: 'transparent'}}
          thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
          thumbProps={{
            children: <View style={styles.dot}></View>,
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>{play ? "STOP" : "PLAY"}</Text>
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={1}
        style={[{flexGrow: 0}]}
        onContentSizeChange={(width, height) => {
            setContentHeight(height)
          }}
          onScrollBeginDrag={() => { scrollAnimation.current.stopAnimation(); 
            setPlay(false)
        }}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            !isBottom && setBottom(true);
          } else {
            isBottom && setBottom(false);
          }

         

        }}
        // contentOffset={{x: 0, y: scrollAnimate}}
      >
        <Animated.Text style={{transform: [{ translateY: -position }]}}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea aut
          provident sed tenetur distinctio dicta praesentium commodi ipsum?
          Molestias in officia aperiam sequi, illo laboriosam, fuga eaque saepe
          reiciendis doloremque doloribus itaque? Molestiae rerum ullam saepe
          facere excepturi fuga mollitia, soluta perspiciatis delectus, neque
          tempore, assumenda doloremque porro tenetur? Maxime repudiandae
          voluptates, fugiat iste dolor tenetur quibusdam unde voluptatem
          similique, quod perferendis ducimus nulla quidem? Provident a vel
          fugit repellat deserunt ratione, perspiciatis fuga impedit, ipsam,
          quam labore? Nihil sunt porro numquam eligendi provident ipsam, quas
          nemo odio commodi, repellendus repudiandae dignissimos ullam, facere
          quia obcaecati animi qui blanditiis magnam? Consequuntur qui ipsa
          voluptate enim fugit impedit sapiente adipisci error at ab quaerat,
          quo fugiat molestiae autem beatae nihil. Libero adipisci dolorum illo
          quod et! Possimus nihil amet provident iure, magni laudantium quo
          facere cupiditate ut ea dolores inventore incidunt quod saepe expedita
          sunt illo, modi aspernatur, vel quidem. Obcaecati soluta impedit
          labore, quia accusantium ex fugiat! Debitis sed, vitae necessitatibus
          veniam repudiandae eveniet odit consequatur labore quaerat incidunt
          quas ea ullam qui, non ex amet nesciunt veritatis assumenda ab sunt
          ducimus delectus unde! Ullam architecto necessitatibus nihil? Sint
          reprehenderit consectetur iste quae, consequatur earum aspernatur nisi
          laborum quaerat cumque obcaecati adipisci minima iusto modi eius
          reiciendis tempore necessitatibus rerum perspiciatis nulla eaque
          dolorum molestiae! Sint magni veritatis voluptas molestias temporibus
          tenetur omnis itaque libero, nostrum eum amet, quo voluptatem at ullam
          molestiae! Veritatis optio odit assumenda rem sint ab nostrum,
          voluptate vitae itaque natus illo exercitationem, quia, ut delectus
          obcaecati veniam? Ipsa veniam tenetur nemo veritatis numquam quo,
          natus iure deserunt repellendus explicabo voluptatibus et possimus
          debitis amet architecto labore omnis reiciendis assumenda quibusdam
          consectetur dolor deleniti. Recusandae nisi unde delectus incidunt
          exercitationem illum suscipit consectetur, numquam eum aut aperiam
          commodi explicabo at labore, inventore similique qui illo quisquam,
          quis consequuntur repellendus a quia nam sunt. Officiis deleniti
          corrupti ab qui in eligendi officia laudantium reprehenderit non. Hic
          minus quidem aliquam ex repudiandae consequatur fugiat in ut harum
          aliquid repellat labore nostrum maiores adipisci nihil eveniet
          laudantium dicta, facilis minima reprehenderit sit vitae? Consectetur
          iure soluta fugiat aliquam eveniet repellat architecto omnis
          accusantium dicta placeat nostrum, ratione sunt, numquam impedit
          facere ad dolore cupiditate exercitationem velit. Ea, facere. Saepe
          ipsam tempora nisi deserunt ipsa soluta illo laudantium suscipit
          quibusdam facilis! Facilis molestiae molestias dignissimos distinctio
          nihil in excepturi fugiat eaque corporis soluta qui laboriosam non,
          nostrum vero? Asperiores, nesciunt? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ea aut provident sed tenetur distinctio
          dicta praesentium commodi ipsum? Molestias in officia aperiam sequi,
          illo laboriosam, fuga eaque saepe reiciendis doloremque doloribus
          itaque? Molestiae rerum ullam saepe facere excepturi fuga mollitia,
          soluta perspiciatis delectus, neque tempore, assumenda doloremque
          porro tenetur? Maxime repudiandae voluptates, fugiat iste dolor
          tenetur quibusdam unde voluptatem similique, quod perferendis ducimus
          nulla quidem? Provident a vel fugit repellat deserunt ratione,
          perspiciatis fuga impedit, ipsam, quam labore? Nihil sunt porro
          numquam eligendi provident ipsam, quas nemo odio commodi, repellendus
          repudiandae dignissimos ullam, facere quia obcaecati animi qui
          blanditiis magnam? Consequuntur qui ipsa voluptate enim fugit impedit
          sapiente adipisci error at ab quaerat, quo fugiat molestiae autem
          beatae nihil. Libero adipisci dolorum illo quod et! Possimus nihil
          amet provident iure, magni laudantium quo facere cupiditate ut ea
          dolores inventore incidunt quod saepe expedita sunt illo, modi
          aspernatur, vel quidem. Obcaecati soluta impedit labore, quia
          accusantium ex fugiat! Debitis sed, vitae necessitatibus veniam
          repudiandae eveniet odit consequatur labore quaerat incidunt quas ea
          ullam qui, non ex amet nesciunt veritatis assumenda ab sunt ducimus
          delectus unde! Ullam architecto necessitatibus nihil? Sint
          reprehenderit consectetur iste quae, consequatur earum aspernatur nisi
          laborum quaerat cumque obcaecati adipisci minima iusto modi eius
          reiciendis tempore necessitatibus rerum perspiciatis nulla eaque
          dolorum molestiae! Sint magni veritatis voluptas molestias temporibus
          tenetur omnis itaque libero, nostrum eum amet, quo voluptatem at ullam
          molestiae! Veritatis optio odit assumenda rem sint ab nostrum,
          voluptate vitae itaque natus illo exercitationem, quia, ut delectus
          obcaecati veniam? Ipsa veniam tenetur nemo veritatis numquam quo,
          natus iure deserunt repellendus explicabo voluptatibus et possimus
          debitis amet architecto labore omnis reiciendis assumenda quibusdam
          consectetur dolor deleniti. Recusandae nisi unde delectus incidunt
          exercitationem illum suscipit consectetur, numquam eum aut aperiam
          commodi explicabo at labore, inventore similique qui illo quisquam,
          quis consequuntur repellendus a quia nam sunt. Officiis deleniti
          corrupti ab qui in eligendi officia laudantium reprehenderit non. Hic
          minus quidem aliquam ex repudiandae consequatur fugiat in ut harum
          aliquid repellat labore nostrum maiores adipisci nihil eveniet
          laudantium dicta, facilis minima reprehenderit sit vitae? Consectetur
          iure soluta fugiat aliquam eveniet repellat architecto omnis
          accusantium dicta placeat nostrum, ratione sunt, numquam impedit
          facere ad dolore cupiditate exercitationem velit. Ea, facere. Saepe
          ipsam tempora nisi deserunt ipsa soluta illo laudantium suscipit
          quibusdam facilis! Facilis molestiae molestias dignissimos distinctio
          nihil in excepturi fugiat eaque corporis soluta qui laboriosam non,
          nostrum vero? Asperiores, nesciunt? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ea aut provident sed tenetur distinctio
          dicta praesentium commodi ipsum? Molestias in officia aperiam sequi,
          illo laboriosam, fuga eaque saepe reiciendis doloremque doloribus
          itaque? Molestiae rerum ullam saepe facere excepturi fuga mollitia,
          soluta perspiciatis delectus, neque tempore, assumenda doloremque
          porro tenetur? Maxime repudiandae voluptates, fugiat iste dolor
          tenetur quibusdam unde voluptatem similique, quod perferendis ducimus
          nulla quidem? Provident a vel fugit repellat deserunt ratione,
          perspiciatis fuga impedit, ipsam, quam labore? Nihil sunt porro
          numquam eligendi provident ipsam, quas nemo odio commodi, repellendus
          repudiandae dignissimos ullam, facere quia obcaecati animi qui
          blanditiis magnam? Consequuntur qui ipsa voluptate enim fugit impedit
          sapiente adipisci error at ab quaerat, quo fugiat molestiae autem
          beatae nihil. Libero adipisci dolorum illo quod et! Possimus nihil
          amet provident iure, magni laudantium quo facere cupiditate ut ea
          dolores inventore incidunt quod saepe expedita sunt illo, modi
          aspernatur, vel quidem. Obcaecati soluta impedit labore, quia
          accusantium ex fugiat! Debitis sed, vitae necessitatibus veniam
          repudiandae eveniet odit consequatur labore quaerat incidunt quas ea
          ullam qui, non ex amet nesciunt veritatis assumenda ab sunt ducimus
          delectus unde! Ullam architecto necessitatibus nihil? Sint
          reprehenderit consectetur iste quae, consequatur earum aspernatur nisi
          laborum quaerat cumque obcaecati adipisci minima iusto modi eius
          reiciendis tempore necessitatibus rerum perspiciatis nulla eaque
          dolorum molestiae! Sint magni veritatis voluptas molestias temporibus
          tenetur omnis itaque libero, nostrum eum amet, quo voluptatem at ullam
          molestiae! Veritatis optio odit assumenda rem sint ab nostrum,
          voluptate vitae itaque natus illo exercitationem, quia, ut delectus
          obcaecati veniam? Ipsa veniam tenetur nemo veritatis numquam quo,
          natus iure deserunt repellendus explicabo voluptatibus et possimus
          debitis amet architecto labore omnis reiciendis assumenda quibusdam
          consectetur dolor deleniti. Recusandae nisi unde delectus incidunt
          exercitationem illum suscipit consectetur, numquam eum aut aperiam
          commodi explicabo at labore, inventore similique qui illo quisquam,
          quis consequuntur repellendus a quia nam sunt. Officiis deleniti
          corrupti ab qui in eligendi officia laudantium reprehenderit non. Hic
          minus quidem aliquam ex repudiandae consequatur fugiat in ut harum
          aliquid repellat labore nostrum maiores adipisci nihil eveniet
          laudantium dicta, facilis minima reprehenderit sit vitae? Consectetur
          iure soluta fugiat aliquam eveniet repellat architecto omnis
          accusantium dicta placeat nostrum, ratione sunt, numquam impedit
          facere ad dolore cupiditate exercitationem velit. Ea, facere. Saepe
          ipsam tempora nisi deserunt ipsa soluta illo laudantium suscipit
          quibusdam facilis! Facilis molestiae molestias dignissimos distinctio
          nihil in excepturi fugiat eaque corporis soluta qui laboriosam non,
          nostrum vero? Asperiores, nesciunt? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ea aut provident sed tenetur distinctio
          dicta praesentium commodi ipsum? Molestias in officia aperiam sequi,
          illo laboriosam, fuga eaque saepe reiciendis doloremque doloribus
          itaque? Molestiae rerum ullam saepe facere excepturi fuga mollitia,
          soluta perspiciatis delectus, neque tempore, assumenda doloremque
          porro tenetur? Maxime repudiandae voluptates, fugiat iste dolor
          tenetur quibusdam unde voluptatem similique, quod perferendis ducimus
          nulla quidem? Provident a vel fugit repellat deserunt ratione,
          perspiciatis fuga impedit, ipsam, quam labore? Nihil sunt porro
          numquam eligendi provident ipsam, quas nemo odio commodi, repellendus
          repudiandae dignissimos ullam, facere quia obcaecati animi qui
          blanditiis magnam? Consequuntur qui ipsa voluptate enim fugit impedit
          sapiente adipisci error at ab quaerat, quo fugiat molestiae autem
          beatae nihil. Libero adipisci dolorum illo quod et! Possimus nihil
          amet provident iure, magni laudantium quo facere cupiditate ut ea
          dolores inventore incidunt quod saepe expedita sunt illo, modi
          aspernatur, vel quidem. Obcaecati soluta impedit labore, quia
          accusantium ex fugiat! Debitis sed, vitae necessitatibus veniam
          repudiandae eveniet odit consequatur labore quaerat incidunt quas ea
          ullam qui, non ex amet nesciunt veritatis assumenda ab sunt ducimus
          delectus unde! Ullam architecto necessitatibus nihil? Sint
          reprehenderit consectetur iste quae, consequatur earum aspernatur nisi
          laborum quaerat cumque obcaecati adipisci minima iusto modi eius
          reiciendis tempore necessitatibus rerum perspiciatis nulla eaque
          dolorum molestiae! Sint magni veritatis voluptas molestias temporibus
          tenetur omnis itaque libero, nostrum eum amet, quo voluptatem at ullam
          molestiae! Veritatis optio odit assumenda rem sint ab nostrum,
          voluptate vitae itaque natus illo exercitationem, quia, ut delectus
          obcaecati veniam? Ipsa veniam tenetur nemo veritatis numquam quo,
          natus iure deserunt repellendus explicabo voluptatibus et possimus
          debitis amet architecto labore omnis reiciendis assumenda quibusdam
          consectetur dolor deleniti. Recusandae nisi unde delectus incidunt
          exercitationem illum suscipit consectetur, numquam eum aut aperiam
          commodi explicabo at labore, inventore similique qui illo quisquam,
          quis consequuntur repellendus a quia nam sunt. Officiis deleniti
          corrupti ab qui in eligendi officia laudantium reprehenderit non. Hic
          minus quidem aliquam ex repudiandae consequatur fugiat in ut harum
          aliquid repellat labore nostrum maiores adipisci nihil eveniet
          laudantium dicta, facilis minima reprehenderit sit vitae? Consectetur
          iure soluta fugiat aliquam eveniet repellat architecto omnis
          accusantium dicta placeat nostrum, ratione sunt, numquam impedit
          facere ad dolore cupiditate exercitationem velit. Ea, facere. Saepe
          ipsam tempora nisi deserunt ipsa soluta illo laudantium suscipit
          quibusdam facilis! Facilis molestiae molestias dignissimos distinctio
          nihil in excepturi fugiat eaque corporis soluta qui laboriosam non,
          nostrum vero? Asperiores, nesciunt?
        </Animated.Text>
      </Animated.ScrollView>
    </View>
  );
};

export default AutoScrolling;

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    backgroundColor: '#cc9a9a',
    borderRadius: 50,
  },
  wrapper: {
    width: 300,
    height: 80,
    backgroundColor: '#867b7b',
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    width: 50,
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    marginLeft: 50,
  },
});
