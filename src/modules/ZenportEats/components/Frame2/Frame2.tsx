import { ContainerStyle, FoodSelectionContainer, SectionStyle } from './styles';
import { FoodTypes, foods } from '@modules/ZenportEats/data/food-menu';

import FoodSelection from '@components/FoodSelection';
import FoodTypeTabs from '@components/FoodTypeTabs';
import OrderDetailCard from '@components/OrderDetailCard/OrderDetailCard';
import OrderTotalCard from '@components/OrderTotalCard';
import { useZenportEats } from '@modules/ZenportEats/hooks/useZenportEats';
import { useMemo, useState } from 'react';

const Frame2 = () => {
  const {
    order,
    setPage,
    selectedIdx,
    setSelectedIdx,
    handleFoodItemAdd,
    handlePersonDelete,
    handlePersonAdd,
  } = useZenportEats();

  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const foodList = useMemo(() => {
    if (selectedTab) {
      return { [selectedTab]: foods[selectedTab] };
    }

    return foods;
  }, [selectedTab]);

  return (
    <ContainerStyle>
      <SectionStyle $padding $width={350}>
        <FoodTypeTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <FoodSelectionContainer>
          {Object.keys(foodList).map((foodType) => {
            return (
              <FoodSelection
                key={foodType}
                foodType={foodType as FoodTypes}
                foodItems={foods[foodType as FoodTypes]}
                onFoodItemAdd={handleFoodItemAdd}
              />
            );
          })}
        </FoodSelectionContainer>
      </SectionStyle>
      <SectionStyle $width={250}>
        {order.orders.map((foodOrder, idx) => {
          return (
            <OrderDetailCard
              key={idx}
              userName={foodOrder.name}
              selected={idx === selectedIdx}
              items={foodOrder.items}
              onDeleteClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();

                if (order.orders.length <= 1) {
                  return;
                }

                handlePersonDelete(idx);
              }}
              onItemClick={() => {
                setSelectedIdx(idx);
              }}
            />
          );
        })}
        <OrderTotalCard
          order={order}
          onAddPersonClick={handlePersonAdd}
          onNextClick={() => {
            setPage(3);
          }}
        />
      </SectionStyle>
    </ContainerStyle>
  );
};

export default Frame2;
