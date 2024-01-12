import { ChangeEvent, useEffect, useState } from 'react';
import { RgbColorPicker, HexColorInput } from 'react-colorful';
import { ILightRGB } from '@constants/types';
import { copyObject, rgbToHex, hexToRgba } from '@utils';
import { useDeviceManage } from '@hooks';

import './styles.css';

const ColorPicker = () => {
  const deviceManager = useDeviceManage();
  const data = deviceManager.devices;
  const [deviceId, scriptId, valueId] = deviceManager.selectedActuation || [];
  const currentDevice = data ? data[deviceId]?.data[scriptId]?.scripts[valueId] : undefined;

  const [hexColor, setHexColor] = useState<string>(currentDevice?.color ? rgbToHex(currentDevice?.color) : 'ffffff');
  const [RGBColor, setRGBColor] = useState<ILightRGB | null>(currentDevice?.color ? hexToRgba(`#${hexColor}`, currentDevice.color.value) : null);

  const changeRGB = (color: { r: number; g: number; b: number }): void => {
    if (RGBColor) {
      const updatedColor = {
        red: color?.r,
        green: color?.g,
        blue: color?.b,
        value: RGBColor.value,
      };

      setRGBColor(updatedColor);
      setHexColor(rgbToHex(updatedColor));
    }
  };

  const changeHEX = (color: string): void => {
    if (RGBColor) {
      setHexColor(color);
      setRGBColor(hexToRgba(`#${color}`, RGBColor.value));
    }
  };

  const RGBInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (+e.target.value <= 255) {
      const tempData = copyObject(RGBColor);

      tempData[e.target.name] = +e.target.value;

      setRGBColor(tempData);
      setHexColor(rgbToHex(tempData));
    } else {
      if (currentDevice?.color) {
        // do not remove next line
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.target.value = currentDevice.color[e.target.name];
      }
    }
  };

  useEffect(() => {
    if (currentDevice && RGBColor) {
      currentDevice.color = RGBColor;
    }
  }, [currentDevice, RGBColor, hexColor]);

  return (
    RGBColor ? (
      <div className="custom-layout">
        <div className="picker-root">
          <RgbColorPicker
            color={{
              r: RGBColor.red,
              g: RGBColor.green,
              b: RGBColor.blue,
            }}
            onChange={changeRGB}
          />
        </div>
        <div className="controls-root">
          <div
            key={RGBColor.red + RGBColor.green + RGBColor.blue}
            className="board"
            style={{ backgroundColor: `#${hexColor}` }}
          />
          <div className="rgb-inputs-box">
            <div>
              <span>R:</span>
              <input
                key={RGBColor.red}
                name="red"
                type="number"
                defaultValue={RGBColor.red}
                min={0}
                max={255}
                onBlur={RGBInputChange}
              />
            </div>
            <div>
              <span>G:</span>
              <input
                key={RGBColor.green}
                name="green"
                type="number"
                defaultValue={RGBColor.green}
                min={0}
                max={255}
                onBlur={RGBInputChange}
              />
            </div>
            <div>
              <span>B:</span>
              <input
                key={RGBColor.blue}
                name="blue"
                type="number"
                defaultValue={RGBColor.blue}
                min={0}
                max={255}
                onBlur={RGBInputChange}
              />
            </div>
          </div>
          <div className="hex-input">
            <span>#</span>
            <HexColorInput color={hexColor} onBlur={(e) => changeHEX(e.currentTarget.value)} />
          </div>
        </div>
      </div>
    ) : (
      <div>

      </div>
    )
  );
};

export default ColorPicker;
