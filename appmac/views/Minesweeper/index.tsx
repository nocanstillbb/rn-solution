import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { binding } from '@nocanstillbb/prism-rn';
import MinesweeperViewModel from '@nocanstillbb/minesweeper';
import { Scale } from '../../theme/Scale';

const vm = MinesweeperViewModel.getMinesVm();

export default function Minesweeper(): React.JSX.Element {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const mines = vm.mines.list;
  const numRows = vm.row_num;
  const numColumns = vm.col_num;

  // 动态计算 cell 尺寸
  const cellSize = useMemo(
    () =>
      Math.min(
        screenWidth / numColumns,
        (screenHeight - Scale.height(40)) / numRows // 预留顶部区域
      ),
    [screenWidth, screenHeight, numRows, numColumns]
  );

  // 同步到 ViewModel
  vm.cellPixcelSize = cellSize;

  const [settingDialogOpen, setSettingDialogOpen] = useState(false);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof mines[0]; index: number }) => (
      <RenderItem item={item} index={index} cellSize={cellSize} />
    ),
    [cellSize]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: styles.noneClinetArea.color,
        overflow: 'hidden',
      }}
    >
      {/* 顶部控制区 */}
      <View
        style={[
          styles.insetBox,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <MineNumber />
        <Button title="🙂" onPress={() => MinesweeperViewModel.regen()} />
        <Timecomponent />
      </View>

      {/* 主区域 */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={mines}
          bounces={false}
          overScrollMode="never"
          key={`${numRows}-${numColumns}-${vm.cellPixcelSize}`}
          contentContainerStyle={[
            styles.flatlist,
            {
              width: cellSize * numColumns,
              height: cellSize * numRows,
            },
          ]}
          renderItem={renderItem}
          numColumns={numColumns}
          keyExtractor={(item) => item.uuid}
          scrollEnabled={false}
        />
      </View>

      {/* 底部按钮 */}
      {/* <FloatButton /> */}
      {/* <FloatButtonRight setSettingDialogOpen={setSettingDialogOpen} /> */}
      {/* <SettingDialog isopen={settingDialogOpen} setIsopen={setSettingDialogOpen} /> */}
    </View>
  );
}

// ========================
// 子组件们
// ========================

// ✅ 单个格子渲染
const RenderItem = React.memo(
  ({ item, index, cellSize }: { item: any; index: number; cellSize: number }) => {
    const [vv] = binding<number>(item, 'visual_value');
    const [pressed, setPressed] = binding<number>(item, 'isPressed');

    useEffect(() => {
      if (pressed) {
        const timer = setTimeout(() => {
          item.isPressed = false;
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [pressed]);

    const backgroundColor =
      vv === 10
        ? 'red'
        : pressed
        ? '#f0f0f0'
        : vv !== -1 && vv !== 9 && vv !== 11 && vv !== 12
        ? 'transparent'
        : '#e0e0e0';

    const getColor = (vv: number) => {
      switch (vv) {
        case 1:
          return '#0100fe';
        case 2:
          return '#017f01';
        case 3:
          return '#fe0000';
        case 4:
          return '#010080';
        case 5:
          return '#810102';
        case 6:
          return '#008081';
        case 7:
          return '#000000';
        case 8:
          return '#808080';
        default:
          return 'black';
      }
    };

    return (
      <TouchableWithoutFeedback onPress={() => MinesweeperViewModel.open(index)}>
        <View style={[{ width: cellSize, height: cellSize }, styles.item]}>
          <View
            style={{
              backgroundColor,
              position: 'absolute',
              top: cellSize * 0.05,
              right: cellSize * 0.05,
              bottom: cellSize * 0.05,
              left: cellSize * 0.05,
              justifyContent: 'center',
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color: getColor(vv),
                  fontSize: Scale.font(cellSize / 3.2),
                  fontWeight: 'bold',
                },
              ]}
            >
              {vv === 9 || vv === 10
                ? '💣'
                : vv === -1 || vv === 0
                ? ''
                : vv === 11
                ? '🚩'
                : vv === 12
                ? '❓'
                : vv.toString()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

// ✅ 显示剩余雷数
const MineNumber = React.memo(() => {
  const [flag_num] = binding<number>(vm, 'flag_num');
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'black', padding: Scale.width(2) }}>
      <Text
        style={{
          color: 'red',
          fontFamily: 'Digital-7 Mono',
          fontSize: Scale.font(8),
        }}
      >
        {String(vm.mine_num - flag_num).padStart(3, '0')}
      </Text>
    </View>
  );
});

// ✅ 显示时间
const Timecomponent = React.memo(() => {
  const [eTime_ms] = binding<number>(vm, 'eTime_ms');
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'black', padding: Scale.width(2) }}>
      <Text
        style={{
          color: 'red',
          fontFamily: 'Digital-7 Mono',
          fontSize: Scale.font(8),
        }}
      >
        {String(Math.floor(eTime_ms / 1000)).padStart(3, '0')}
      </Text>
    </View>
  );
});

// ✅ 左下角旗子按钮
const FloatButton = React.memo(() => {
  const [mode] = binding<number>(vm, 'mode');
  return (
    <TouchableOpacity
      onPress={() => {
        vm.mode ^= 1;
      }}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 100,
        height: 100,
        padding: Scale.width(8),
      }}
    >
      <Text style={{ fontSize: 40, color: mode ? 'red' : 'gray' }}>🚩</Text>
    </TouchableOpacity>
  );
});

// ✅ 右下角设置按钮
const FloatButtonRight = React.memo(
  ({ setSettingDialogOpen }: { setSettingDialogOpen: Function }) => (
    <TouchableOpacity
      onPress={() => setSettingDialogOpen(true)}
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 100,
        height: 100,
        padding: Scale.width(8),
      }}
    >
      <Text style={{ fontSize: 40, color: 'gray' }}>⚙️</Text>
    </TouchableOpacity>
  )
);

// ========================
// 样式表
// ========================

const styles = StyleSheet.create({
  noneClinetArea: {
    color: '#f5f5f5',
    color2: '#ddd',
  },
  flatlist: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insetBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#a3a3a3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Scale.width(-2),
  },
});
