import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import {Fonts} from '../assets/fonts/Customfont';
import { SelectionElementType } from '@/types/selectionOptionsTypes';

// Interface for props
interface SelectableCardGridProps {
  data: {id: string; emoji: ImageSourcePropType; label: string}[];
  selectedData?: SelectionElementType[];
  isMultiSelect?: boolean;
  onSelectionChange?: (selected: SelectionElementType[] | SelectionElementType) => void;
  onSelectionChangeElement?: (selected: SelectionElementType[] | string) => void;
  columns?: number;
  title?: string;
  isBodyShapeType?: boolean;
  description?: string;
  customTitleStyle?: TextStyle | TextStyle[];
  customSubTitleStyle?: TextStyle | TextStyle[];
}

const SelectableCardGrid = ({
  data = [],
  selectedData = [],
  isMultiSelect = true,
  onSelectionChange = () => {},
  onSelectionChangeElement = () => {},
  columns = 3,
  title = '',
  description = '',
  isBodyShapeType = false,
  customTitleStyle,
  customSubTitleStyle,
}: SelectableCardGridProps) => {
  const [selected, setSelected] = useState<SelectionElementType[]>(selectedData);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleSelect = (element: SelectionElementType) => {
    let updated: SelectionElementType[] = [];
    let updatedElement: SelectionElementType[] = [];

    if (isMultiSelect) {
      updated = selected.includes(element)
        ? selected.filter(item => item.id !== element.id)
        : [...selected, element];
      // updatedElement = selected.includes(element.id)
      //   ? selected.filter(item => item !== element.id)
      //   : [...selected, element];

      // updatedElement = updated.map(item => {
      //   return {
      //     id: item,
      //     label: data.find(dataItem => dataItem.id === item)?.label,
      //     emoji: data.find(dataItem => dataItem.id === item)?.emoji,
      //   };
      // });
        
      setSelected(updated);
      onSelectionChange(updated);
    } else {
      updated = [element];
      updatedElement = [element];
      setSelected(updated);
      onSelectionChange([element]); // single selection returns string
    }
    onSelectionChangeElement(updatedElement);
  };

  useEffect(() => {
    setSelected(selectedData);
  }, [selectedData]);


  const renderItem = ({
    item,
  }: {
    item: SelectionElementType;
  }) => {
    const isSelected = selected.includes(item);
    const isHovered = hoveredId === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => toggleSelect(item)}
          onPressIn={() => setHoveredId(item.id)}
          onPressOut={() => setHoveredId(null)}
          activeOpacity={0.8}>
          <View
            style={[
              styles.card,
              isSelected && styles.cardSelected,
              isHovered && styles.cardHovered,
            ]}>
            {isSelected ? (
              <LinearGradient
                colors={[colors.gradientstartColor, colors.gradientendColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradient}>
                <View
                  style={
                    isBodyShapeType ? styles.contentBodyShape : styles.content
                  }>
                  <Image
                    source={item.emoji}
                    style={
                      isBodyShapeType ? styles.emojiBodyShape : styles.emoji
                    }
                  />
                </View>
              </LinearGradient>
            ) : (
              <View
                style={
                  isBodyShapeType ? styles.contentBodyShape : styles.content
                }>
                <Image
                  source={item.emoji}
                  style={isBodyShapeType ? styles.emojiBodyShape : styles.emoji}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Text
          style={[styles.label, isSelected && styles.labelSelected]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {title ? (
        <Text style={[styles.title, customTitleStyle]}>{title}</Text>
      ) : null}
      {description ? (
        <Text style={[styles.subTitle, customSubTitleStyle]}>
          {description}
        </Text>
      ) : null}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={columns}
        style={styles.flatListStyle}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default SelectableCardGrid;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: Fonts.inter400,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  flatListStyle: {
    paddingTop: 8,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  itemContainer: {
    width: `${100 / 3}%`,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.trustBase,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 2,
    overflow: 'hidden',
    width: '100%',
    height: 80,
  },
  cardSelected: {
    backgroundColor: 'transparent',
  },
  cardHovered: {
    transform: [{translateY: -4}],
    borderColor: colors.gradientstartColor,
    // Removed backgroundColor: colors.white to prevent white flash
  },
  gradient: {
    borderRadius: 8,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  contentBodyShape: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBodyShape: {
    width: 40,
    resizeMode: 'cover',
    height: '100%',
    flex: 1,
    backfaceVisibility: 'hidden',
  },
  emoji: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.inter500,
    textAlign: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  labelSelected: {
    color: colors.gradientstartColor,
  },
});
