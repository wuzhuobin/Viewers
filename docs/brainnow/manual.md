# <center>MANUAL</center>

## Required Dicom Attribute

* (0008,103E) SeriesDescription

  This tag is used to find the colormap in cornerstone(e.g. jet). If a coloramp is found the image will be rendered with the colormap. Currently supported colormap in cornerstone :

  ```js
  ["autumn", "blues", "bone", "cool", "coolwarm", "copper", "gray", "hot", "hotIron", "hotMetalBlue", "hsv", "jet", "pet", "pet20Step", "spectral", "spring", "summer", "winter"]
  ```
  If the colormap cannot be found, the image will be render as grayscale.

* (0008,0016) SOPClassUID

  This tag is used to decide whether to render image with BrainnowCornerstoneViewport, which provides synchronal slicing and colormap function. The value of this attribute must be one of:
  ```js
  ['1.2.840.10008.5.1.4.1.1.4', '1.2.840.10008.5.1.4.1.1.4.1']
  ```
  Otherwise the image is rendered as normal CornerstoneViewport(no synchronization and colormap).

## URL format

The URL address follows another URL address that links to the json file.
```
http[s]://${HOSTNAME}:3000/#/brainnow/${JSON_URL}
```

e.g.
[http://127.0.0.1:3000/#/brainnow/https://dev-download.obs.cn-north-1.myhuaweicloud.com/FcdFrontData/demo/BN-FCD100001/fcd.json
](http://127.0.0.1:3000/#/brainnow/https://dev-download.obs.cn-north-1.myhuaweicloud.com/FcdFrontData/demo/BN-FCD100001/fcd.json)

## JSON format

The json file contains URLs for all dicom images. "jet" is the image showing at left, "t2" is the image showing at right.

```json
{
  "t2": URL_ARRAY,
  "jet": URL_ARRAY
}
```

e.g.
```json
{
  "t2": [
    "http://192.168.70.140:3000/dcm/flair/img00000.dcm",
    "http://192.168.70.140:3000/dcm/flair/img00001.dcm",
    "http://192.168.70.140:3000/dcm/flair/img00002.dcm",
    "http://192.168.70.140:3000/dcm/flair/img00003.dcm",
  ],
  "jet": [
  "http://192.168.70.140:3000/dcm/jet/img00000.dcm",
  "http://192.168.70.140:3000/dcm/jet/img00001.dcm",
  "http://192.168.70.140:3000/dcm/jet/img00002.dcm",
  ]
}
```

## hotkeys

| Keyboard |  Function                                |
| -------- | ---------------------------------------- |
| right    | 'Next Image Viewport'                    |
| left     | 'Previous Image Viewport'                |
| r        | 'Rotate Right '                          |
| l        | 'Rotate Left '                           |
| i        | 'Invert'                                 |
| h        | 'Flip Horizontally                       |
| v        | 'Flip Vertically                         |
| +        | 'Zoom In'                                |
| -        | 'Zoom Out'                               |
| =        | 'Zoom to Fit                             |
| space    | 'Rest'                                   |
| down     | 'Next Image '                            |
| up       | 'Previous Image'                         |
| pagedown | 'Previous Series'                        |
| pageup   | 'Next Series'                            |
| z        | 'Zoom'                                   |
