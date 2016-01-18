'use strict';

angular.module('commandsender.commands')
  .controller('Commands', ['$scope', 'rendererService', 'uuidService',
    function($scope, rendererService, uuidService) {

      var vm = {
        stack: [],
        newCommand: {
          commandId: uuidService.newUuid(),
          properties: ['', '', ''],
          command: '',
          attributes: ''
        },
        ip: '127.0.0.1',
        response: '',
        editingCommand: false
      };

      vm.resetCommand = function(){
        vm.newCommand = {
          commandId: uuidService.newUuid(),
          properties: ['', '', ''],
          command: '',
          attributes: ''
        };
      };

      vm.addToStack = function() {
        vm.stack.push(vm.newCommand);
        vm.resetCommand();
      };

      vm.editCommand = function(command) {
        vm.newCommand = angular.copy(command);
        vm.editingCommand = true;
      };

      vm.cancelEdit = function() {
        vm.editingCommand = false;
        vm.resetCommand();
      };

      vm.confirmEdit = function() {
        var temp = [];

        for (var i = 0; i < vm.stack.length; i+= 1){
          if(vm.newCommand.commandId === vm.stack[i].commandId){
            temp.push(vm.newCommand);
          } else {
            temp.push(vm.stack[i]);
          }
        }

        vm.stack = temp;

        vm.editingCommand = false;
        vm.resetCommand();
      };

      vm.deleteCommand = function(index) {
        var temp = [];

        for (var i = 0; i < vm.stack.length; i+= 1){
          if(i !== index){
            temp.push(vm.stack[i]);
          }
        }
        vm.stack = temp;
      };

      vm.clearStack = function() {
        vm.stack = [];
      };

      vm.createSendCommand = function(command){

          var nonBlankProps = [];

          for (var i = 0; i < command.properties.length; i += 1){
            if (command.properties[i] !== ''){
              nonBlankProps.push(command.properties[i]);
            }
          }

          var send = '1 ' + nonBlankProps.join('*') + ' ' + command.command + ' ' + command.attributes;

          console.log(send);

          return send;
      };

      vm.sendCommand = function(command) {
        if (vm.ip !== '') {
          rendererService.render({
            ip: vm.ip,
            command: vm.createSendCommand(command)
          }).then(function(response) {
            vm.response = response;
          });
        }
      };

      vm.slots = [
        [
          '#OBJECTID',
          'ALL_TABLE',
          'ANIMATION*KEY*$',
          'ARCHIVE',
          'AUDIO',
          'AUDIO_CLIP',
          'AUTOKEYWORD',
          'BACK_SCENE',
          'BASE_FONT',
          'BGL_COMPATIBILITY',
          'BUILT_IN',
          'CHAR_STYLE',
          'CLOCK',
          'CLOCK%1',
          'CLOCK*DATA',
          'CLR',
          'CMD_RECORD',
          'COMMANDS_XML',
          'CONFIGURATION',
          'CONSOLE',
          'CONTAINER',
          'DATABASE',
          'DEBUG_CONTROL',
          'DEBUG_PUSH',
          'DEVICE',
          'DIRECTORY',
          'EDITOR',
          'EVS',
          'FEEDBACK',
          'FEEDBACKUNICAST',
          'FONT',
          'FRONT_SCENE',
          'FUNCTION',
          'GEOM',
          'GLOBAL',
          'GUI*PID',
          'HARDWARE*GRAPHICS',
          'HARDWARE*NUMBER_CLIPIN_CHANNELS',
          'HARDWARE*NUMBER_CLIPOUT_CHANNELS',
          'HARDWARE*NUMBER_GFX_CHANNELS',
          'HARDWARE*NUMBER_GPUS',
          'HARDWARE*NUMBER_STREAMIN_CHANNELS',
          'HARDWARE*NUMBER_VIDEO_INPUTS',
          'HARDWARE*NUMBER_VIDEOIN_CHANNELS',
          'HARDWARE*SYSTEM',
          'HARDWARE*VIDEO_OUTPUT',
          'IMAGE',
          'LOCATION',
          'LOG',
          'MAGIC',
          'MAIN',
          'MAIN_SCENE',
          'MATERIAL',
          'MATERIAL_ADVANCED',
          'MEDIA_PREVIEW',
          'MEMORY',
          'MODIFIER',
          'MUX',
          'OBJECT_ID',
          'OBJECT_TYPE',
          'ONAIR',
          'PLATFORM',
          'PLAY',
          'PLUGIN_MANAGER',
          'POOLS',
          'POSTRENDERER',
          'PROCESS*MEMORY',
          'REND',
          'RENDER_TO_DISK',
          'RENDERER',
          'SCENE',
          'SCENE_EDITOR',
          'SCENE_RENDERER',
          'SHADER',
          'STAGE_EVENTS',
          'SUBSTANCE',
          'SUGGESTION',
          'SYSTEM*CHANNEL*%1',
          'SYSTEM*FLICKER_FILTER_SUPPORTED',
          'SYSTEM*HARDWARE_TYPE',
          'SYSTEM*MEMORY',
          'SYSTEM*MEMORY_ADVANCED',
          'SYSTEM_GLOBALS*EDITOR_SIZE',
          'SYSTEM_GLOBALS*OUTPUT_POS',
          'SYSTEM_GLOBALS*OUTPUT_SIZE',
          'SYSTEM_GLOBALS*SHOW_MOUSE_CURSOR',
          'TC',
          'TEST_SIGNALS',
          'TEXTURE*MEMORY',
          'TRIO',
          'UNDOREDO',
          'VERSIONS',
          'VIDEO_CLIP',
          'VIZ2POINTX_MODE',
          'VIZ_COMMUNICATION',
          'VIZ_PROGRAMDATA_FOLDER',
          'VIZ_PUBLICDOCUMENTS_FOLDER',
          'VIZONE',
          'VTS',
          '{UUID}'
        ],
        [
          '#OBJECTID',
          'ANIMATION',
          'ANIMATION*',
          'ANIMATION*CHANNEL*$',
          'ANIMATION*CHANNEL_FORCED*$',
          'ANIMATION*KEY',
          'ANIMATION*KEY*',
          'ANIMATION*KEY*$',
          'ANIMATION*OFFSET',
          'AUTO_KEY_POS',
          'BACK_LAYER',
          'BACK_LAYER*EYE_SEPARATION',
          'BACK_LAYER*LAYER_VISIBLE',
          'BACK_LAYER*OVERWRITE_STEREO',
          'BACK_LAYER*ZERO_PARALLAX_DIST',
          'BACKGROUND*ALPHA',
          'BACKGROUND*COLOR',
          'BACKGROUND*IMAGE',
          'BACKGROUND*IMAGE*ACTIVE',
          'CAMERA%1',
          'CAMERA*DATA',
          'CAMERA_ASPECT',
          'CAMERA_FAR',
          'CAMERA_NEAR',
          'CLIPPER%1',
          'CLIPPER*DATA',
          'COLOR_CORRECTION_BIAS',
          'COLOR_CORRECTION_SCALE',
          'COMMANDS_XML',
          'CONTAINERSCRIPTS',
          'CONTENTS_VISIBLE',
          'CONTROL',
          'COORDINATE_SYSTEM',
          'CSC',
          'CULLING',
          'CURRENT_CAMERA',
          'CURRENT_CAMERA*EYE_SEPARATION',
          'CURRENT_CAMERA*STEREO_METHOD',
          'CURRENT_CAMERA*ZERO_PARALLAX_DIST',
          'DEFAULT_CAMERA',
          'DEFOCUS_BLUR',
          'DEFOCUS_MODE',
          'DEPTH_BUFFER',
          'DEPTH_BUFFER_STATE',
          'EDITED_OBJECT',
          'EDITED_OBJECTS',
          'EDITED_PATH_HANDLE',
          'ENABLE_SHADOWS',
          'EXTRA_INFO',
          'EYE_SEPARATION',
          'FILE_LINKS',
          'FLICKER_FILTER',
          'FORCE_DRAW_OUTLINE',
          'FOREGROUND*IMAGE',
          'FOREGROUND*IMAGE*ACTIVE',
          'FRAME_RATE',
          'FRONT_LAYER',
          'FRONT_LAYER*EYE_SEPARATION',
          'FRONT_LAYER*LAYER_VISIBLE',
          'FRONT_LAYER*OVERWRITE_STEREO',
          'FRONT_LAYER*ZERO_PARALLAX_DIST',
          'FUNCTION',
          'GAMMA',
          'GFX*%1',
          'GLOBALS',
          'GRID',
          'GRID*SELECT',
          'HUD',
          'IGNORE_GUI_REBUILD',
          'INFOTEXT',
          'INITIALIZE',
          'INITIALIZE*COMMAND',
          'INITIALIZE*DIRECTOR',
          'INITIALIZE*FREQUENCY',
          'INITIALIZE*LOAD',
          'INITIALIZE*TYPE',
          'KEEP_STORED_ORTHO_FRUSTUM',
          'KEY_INTERNAL',
          'KEY_INTERNAL*ACTIVE',
          'KEY_RENDERMODE',
          'LAYOUT*NUMBER',
          'LAYOUT*TYPE',
          'LIGHT%1',
          'LIGHT*DATA',
          'LOCATION_PATH',
          'MAIN_LAYER',
          'MAIN_LAYER*EYE_SEPARATION',
          'MAIN_LAYER*LAYER_VISIBLE',
          'MAIN_LAYER*OVERWRITE_STEREO',
          'MAIN_LAYER*ZERO_PARALLAX_DIST',
          'MAP',
          'MASK_INVERT',
          'MEDIA_ASSETS',
          'MERGE_STYLE',
          'MIDDLE_LAYER',
          'NAME',
          'NO_GFX_CHANNELS',
          'NUMBER_OF_MASK_BITS',
          'OBJECT_ID',
          'OBJECT_TYPE',
          'OUTPUT_REGION',
          'OVERWRITE_STEREO',
          'PICK_LAYER',
          'PICK_QUAD',
          'PICK_QUAD_DATA',
          'POST',
          'POST*STATUS',
          'POST_MODE',
          'RAMPLER*ACTIVE',
          'RAMPLER*BEGIN',
          'RAMPLER*BOTTOM',
          'RAMPLER*END',
          'RAMPLER*LEFT',
          'RAMPLER*RIGHT',
          'RAMPLER*TOP',
          'RESET_CLIP_CHANNELS_ON_SET_SCENE',
          'RINGING_FILTER',
          'S2V*%1',
          'S2V*INDEX',
          'SAA',
          'SAA*ACTIVE',
          'SAA*SAMPLES',
          'SCENE_DATA',
          'SCRIPT',
          'SCRIPT_COLOR_OLD',
          'SELF_LAYER',
          'SELF_LAYER_CAMERA',
          'SHADOW_TYPE',
          'SHORTCUTS',
          'STAGE',
          'STEREO_PARAMETERS',
          'TARGA3200',
          'TEXT_EDITOR',
          'TREE',
          'UPDATE',
          'USE_AUTO_KEY',
          'USER_ASPECT',
          'UUID',
          'VERSION',
          'VGA_PREVIEW',
          'VIDEO',
          'VIDEO*%1*FORMAT',
          'VIDEO*%1*MODE',
          'VIEW',
          'ZERO_PARALLAX_DIST',
          '{UUID}',
        ],
        [
          '#OBJECTID',
          'ANIMATION',
          'ANIMATION*',
          'ANIMATION*CHANNEL*$',
          'ANIMATION*CHANNEL_FORCED*$',
          'ANIMATION*KEY',
          'ANIMATION*KEY*',
          'ANIMATION*KEY*$',
          'ANIMATION*OFFSET',
          'AUTO_KEY_POS',
          'BACKGROUND*ALPHA',
          'BACKGROUND*COLOR',
          'BACKGROUND*IMAGE',
          'BACKGROUND*IMAGE*ACTIVE',
          'CAMERA%1',
          'CAMERA*DATA',
          'CAMERA_ASPECT',
          'CAMERA_FAR',
          'CAMERA_NEAR',
          'CLIPPER%1',
          'CLIPPER*DATA',
          'COLOR_CORRECTION_BIAS',
          'COLOR_CORRECTION_SCALE',
          'COMMANDS_XML',
          'CONTAINERSCRIPTS',
          'CONTROL',
          'CULLING',
          'CURRENT_CAMERA',
          'DEFAULT_CAMERA',
          'DEFOCUS_BLUR',
          'DEFOCUS_MODE',
          'DEPTH_BUFFER',
          'DEPTH_BUFFER_STATE',
          'EDITED_OBJECT',
          'EDITED_OBJECTS',
          'EDITED_PATH_HANDLE',
          'ENABLE_SHADOWS',
          'EXTRA_INFO',
          'FILE_LINKS',
          'FLICKER_FILTER',
          'FORCE_DRAW_OUTLINE',
          'FOREGROUND*IMAGE',
          'FOREGROUND*IMAGE*ACTIVE',
          'FRAME_RATE',
          'FUNCTION',
          'GAMMA',
          'GFX*%1',
          'GLOBALS',
          'GRID',
          'GRID*SELECT',
          'IGNORE_GUI_REBUILD',
          'INFOTEXT',
          'INITIALIZE',
          'INITIALIZE*COMMAND',
          'INITIALIZE*DIRECTOR',
          'INITIALIZE*FREQUENCY',
          'INITIALIZE*LOAD',
          'INITIALIZE*TYPE',
          'KEEP_STORED_ORTHO_FRUSTUM',
          'KEY_RENDERMODE',
          'LAYOUT*NUMBER',
          'LAYOUT*TYPE',
          'LIGHT%1',
          'LIGHT*DATA',
          'LOCATION_PATH',
          'MAP',
          'MASK_INVERT',
          'MEDIA_ASSETS',
          'MERGE_STYLE',
          'NAME',
          'NO_GFX_CHANNELS',
          'NUMBER_OF_MASK_BITS',
          'OBJECT_ID',
          'OBJECT_TYPE',
          'OUTPUT_REGION',
          'RAMPLER*ACTIVE',
          'RAMPLER*BEGIN',
          'RAMPLER*BOTTOM',
          'RAMPLER*END',
          'RAMPLER*LEFT',
          'RAMPLER*RIGHT',
          'RAMPLER*TOP',
          'RESET_CLIP_CHANNELS_ON_SET_SCENE',
          'RINGING_FILTER',
          'S2V*%1',
          'S2V*INDEX',
          'SCENE_DATA',
          'SCRIPT',
          'SCRIPT_COLOR_OLD',
          'SELF_LAYER',
          'SELF_LAYER_CAMERA',
          'SHADOW_TYPE',
          'STAGE',
          'TARGA3200',
          'TREE',
          'USE_AUTO_KEY',
          'USER_ASPECT',
          'UUID',
          'VERSION',
          'VIDEO',
          'VIDEO*%1*FORMAT',
          'VIDEO*%1*MODE',
          '{UUID}'
        ],
        [
          'COMMAND_INFO',
          'INVOKE',
          'LOAD_PLUGIN_SOURCE',
          'MAKE_PLUGIN',
          'SET_CHANGED'
        ]
      ];

      $scope.vm = vm;
    }
  ]);
