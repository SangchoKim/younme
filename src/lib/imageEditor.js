import ImageEditor from '@toast-ui/react-image-editor'
import React from 'react';

const _imageName = () => {
  console.log(this.refs.imageEditor.toDataURL());
}


export const imageEditor = (imageName) => {
    return <ImageEditor
                    includeUI={{
                    loadImage: {
                            path: imageName,
                            name: 'SampleImage'
                          },
                          menu: ['shape', 'filter','text','icon','crop','flip','mask',"rotate"
                          ,"draw"
                          ],
                          initMenu: 'filter',
                          uiSize: {
                            width: '1000px',
                            height: '700px'
                          },
                          menuBarPosition: 'bottom'
                        }}
                        cssMaxHeight={500}
                        cssMaxWidth={700}
                        selectionStyle={{
                          cornerSize: 20,
                          rotatingPointOffset: 70
                        }}
                        usageStatistics={true}
                        ref='imageEditor'
                />
             
}


