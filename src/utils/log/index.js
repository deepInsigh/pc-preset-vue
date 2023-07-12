export class LogUploaderSDK {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }
  async uploadLog(logData) {
    const url = `${this.serverUrl}${
      logData.auth
        ? '/SCM.Mobile.WebApi/WriteLog/WriteLog'
        : '/SCM.Log.OpenApi/v2/WriteLogSvc/WriteLog'
    }`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token');
    headers.append('Token', logData.token);

    const body = {
      logLevel: logData.logLevel ?? 'error', //error  info
      content: logData.content + '[设备信息：' + JSON.stringify(getDeviceInfo()) + ']',
      transactionId: logData.transactionId ?? Date.now(),
      ttId: logData.ttid ?? '',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log('日志上传成功');
      } else {
        console.error('日志上传失败');
      }
    } catch (error) {
      console.error('日志上传失败', error);
    }
  }
}

function getBrowserDeviceInfo() {
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  return {
    userAgent,
    screenWidth,
    screenHeight,
  };
}

function getMobileDeviceInfo() {
  const device = cordova.plugins.device;
  return device
    ? {
        model: device.model,
        platform: device.platform,
        version: device.version,
      }
    : {};
}

function getWXMobileDeviceInfo(callback) {
  wx.getSystemInfo({
    success: function (res) {
      let deviceInfo = {
        brand: res.brand,
        model: res.model,
        pixelRatio: res.pixelRatio,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight,
        statusBarHeight: res.statusBarHeight,
        language: res.language,
        version: res.version,
        system: res.system,
        platform: res.platform,
      };
      callback(deviceInfo);
    },
  });
}

function getDeviceInfo() {
  if (/Mobile|Android/i.test(navigator.userAgent)) {
    return getMobileDeviceInfo();
  }
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    return new Promise(resolve => {
      getWXMobileDeviceInfo(deviceInfo => {
        resolve(deviceInfo);
      });
    });
  }
  return getBrowserDeviceInfo();
}

// const sdk = new LogUploaderSDK('https://testxa.360scm.com');

// const logData = {
//   content: '这是一条日志信息',
//   transactionId: '司机账号',
//   token: 'token',
//   ttid: 'ttid',   // PC端不用传，移动端必传
// };

// sdk.uploadLog(logData);
