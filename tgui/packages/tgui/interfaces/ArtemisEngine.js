import { round } from '../../common/math';
import { useBackend } from '../backend';
import { Button, LabeledControls, LabeledList, RoundGauge, Section } from '../components';
import { Window } from '../layouts';


export const ArtemisEngine = (props, context) => {
  const { act, data } = useBackend(context);
  // Extract `health` and `color` variables from the `data` object.
  const {
    fuel_tank,
    engine_on,
    tank_on,
    exciter_stat,
    casing_integrity,
    casing_full_integrity,
    casing_rate,
    coil_strength,
    min_pressure,
    max_tank_pressure,
  } = data;


  const handleTogglePower = () => {
    act('toggle-power');
  };
  const handleToggleTank = () => {
    act('toggle-tank');
  };
  return (
    <Window >
      <Window.Content scrollable>
        <Section title="Fuel tank"
          buttons={(
            <Button
              color={tank_on ? "good": "bad"}
              content={tank_on ? "input on": "input off"}
              onClick={() => handleToggleTank()}
            />
          )}>
          <LabeledControls>
            <LabeledControls.Item label="Fuel">
              <RoundGauge
                value={fuel_tank}
                minValue={min_pressure}
                maxValue={max_tank_pressure}
                ranges={{
                  "good": [max_tank_pressure * 0.5, max_tank_pressure],
                  "average": [max_tank_pressure * 0.25, max_tank_pressure * 0.5],
                  "bad": [0, max_tank_pressure * 0.25],
                }}
              />
            </LabeledControls.Item>
          </LabeledControls>
        </Section>
        <Section title="Drive statistics"
          buttons={(
            <Button
              color={engine_on ? "good": "bad"}
              content={engine_on ? "Drive on": "Drive off"}
              onClick={() => handleTogglePower()}
            />
          )}>
          <LabeledList>
            <LabeledList.Item label="excitor">
              {exciter_stat}
            </LabeledList.Item>
            <LabeledList.Item label="casing">
              <RoundGauge
                minValue={0}
                maxValue={casing_full_integrity}
                value={casing_integrity}
                ranges={{
                  "good": [casing_full_integrity * 0.75, casing_full_integrity],
                  "average": [casing_full_integrity * 0.25, casing_full_integrity * 0.75],
                  "bad": [0, casing_full_integrity * 0.25],
                }}
              />
            </LabeledList.Item>
            <LabeledList.Item label="degredation rate">
              {round(casing_rate, 3)}
            </LabeledList.Item>
            <LabeledList.Item label="field strength">
              {coil_strength}
            </LabeledList.Item>
          </LabeledList>
        </Section>
      </Window.Content>
    </Window>
  );
};
