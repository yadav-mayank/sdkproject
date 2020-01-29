import React from 'react';
import './App.css';
import {PhonePe} from 'phonepesdk-web'

let sdk

PhonePe.PhonePe.build("web").then((ppSDK) => sdk = ppSDK).catch(err => console.log(err))

class App extends React.Component {

currentOS = () => {
    return 'ios';
    //return 'android';
}

createuuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

transactionId = () => {
    return this.createuuid()
}

reservervationId = () => {
    return this.createuuid()
}

setData = () => {
    //let os = (this.currentOS() === 'ios') ? PhonePe.Constants.OS.ios : PhonePe.Constants.OS.android
    //console.log('Fetching OS dynamically = ' + os)
    //console.log('Species = ' + PhonePe.Constants.Species.web)
    const key = document.getElementById('key').value
    const value = document.getElementById('value').value
        let res = sdk.isMethodSupported('setItem')
        console.log('setItem method supported = ' + res)
        sdk.setItem('test', key, value)
}

getData = () => {
    const key = document.getElementById('getdata-key').value
        let res = sdk.isMethodSupported('getItem')
        console.log('getItem method supported = ' + res)
        sdk.getItem('test', key, null).then((data) => {
            console.log("data received on js side = " + data)
            alert("value " + data)
        }).catch((err) => {
            console.log("Error found = " + err)
        })
}

removeData = () => {
    const key = document.getElementById('removedata-key').value
        let res = sdk.isMethodSupported('removeItem')
        console.log('removeItem method supported = ' + res)
        sdk.removeItem('test', key)
}

startUpdatingLocation = () => {
        let res = sdk.isMethodSupported('startUpdatingLocation')
        console.log('startUpdatingLocation method supported = ' + res)
        sdk.startUpdatingLocation()
}

stopUpdatingLocation = () => {
        let res = sdk.isMethodSupported('stopUpdatingLocation')
        console.log('stopUpdatingLocation method supported = ' + res)
        sdk.stopUpdatingLocation()
}

registerLocationUpdateSuccessCallback = () => {
        sdk.registerLocationUpdateSuccessCallback('callbackName', (response) => {
            console.log('Location success response = ' + JSON.stringify(response))
        })
}

registerLocationUpdateFailureCallback = () => {
        sdk.registerLocationUpdateFailureCallback('callbackName', (response) => {
            console.log('Location failure response = ' + JSON.stringify(response))
        })
}

getCurrentLocation = () => {
    console.log('Trying to get current location')
    let res = sdk.isMethodSupported('getCurrentLocation')
    console.log('getCurrentLocation method supported = ' + res)

    sdk.getCurrentLocation().then((location) => {
        console.log("location received on js side = " + location)
        alert(location)
    }).catch((err) => {
        alert(err)
        console.log("Error found when fetching location = " + err)
    })

}

/**
 * openTransactionDetailsPage(transactionId: string): Promise<any> | void {
 }
 **/

navigateToTransactionDetails = () => {
    let res = sdk.isMethodSupported('openTransactionDetailsPage')
    console.log('openTransactionDetailsPage method supported = ' + res)
    sdk.openTransactionDetailsPage(this.transactionId())
}

navigateToPayments = () => {

    let merchantName = 'Ticket New'
    let metadata = [{
        "Movie Name": "Avengers"
    }, {"Seats": "3A, 3B, 3C"}]
    let timeoutInterval = 480000

    let context = {
        "merchantId": "TICKETNEWTEST",
        "merchantTransactionId": "transactionId010",
        "reservationId": "W1803281253545745701305",
        "serviceCategory": "MOVIE",
        "validFor": 86400,
        "payableAmount": 5000,
        "quantity": 2
    }

    /**
     * openPaymentsPage(fallbackURL: string, merchantName: string, context: { [key: string]: any }, imageURL?: string, metaData?: { [key: string]: string }): Promise<any> | void {
     }
     * **/
        // let actionButtonProp = new PhonePe.PaymentModels.ActionButtonProp('Done')
        // let confirmationState = { [PhonePe.PaymentModels.TransactionState.COMPLETED] : actionButtonProp }
        sdk.openPaymentsPage(merchantName, context, "", "").then((response) => {
            console.log("Payment was successful = " + response)
        }).catch((err) => {
            console.log("Payment failed with error = " + err)
        })
}

seekPermission = () => {
    // let readsms = PhonePe.Constants.Permission.READ_SMS
    // let location = PhonePe.Constants.Permission.LOCATION

    let res = sdk.isMethodSupported('seekPermission')
    console.log('seekPermission method supported = ' + res)

    sdk.seekPermission(['READ_SMS', 'LOCATION']).then((data) => {
        console.log('Successfully got permission for readsms')
    })
}

openSettingsPage = () => {
        let res = sdk.isMethodSupported('openSettingsPageForPermission')
        console.log('openSettingsPageForPermission method supported = ' + res)

        sdk.openSettingsPageForPermission().then(() => {
            console.log('Successfully opened settings page')
        })
}

logMerchantEvent = () => {

    let res = sdk.isMethodSupported('logMerchantEvent')
    console.log('logMerchantEvent method supported = ' + res)

    let name = 'Test'
    let metadata = { 'key': 'value' }

    sdk.logMerchantEvent(name, metadata).then(() => {
        console.log('Successfully sent event with name = ' + name)
    })

}

replace = () => {

    console.log('Using Replace state');

    if (window.history.replaceState) {
        window.history.replaceState(null, "Page", "test.html");
        window.history.go(0);
    } else {
        window.location.replace();
    }

    // if(!!(window.history && history.replaceState)){
    //     console.log('Using Replace state inside');
    //     console.log('History before = ' + window.history);
    //     window.history.replaceState({}, document.title, "test.html");
    //     console.log('History after = ' + window.history);
    // } else {
    //     location.replace("test.html");
    // }

    // document.location.replace('test.html')
}

//sample :         eyJtZXJjaGFudElkIjoiT1lPVEVTVCIsIm1lcmNoYW50T3JkZXJJZCI6IjVjMGZiYWFmODNhZjQ1IiwicmVzZXJ2YXRpb25JZCI6IlIxOTA0MDQxNDMwMTkyNTE4NjgzMjM1In0=

reserveOrder = () => {
    let res = sdk.isMethodSupported('reserveOrder')
    console.log('reserveOrder method supported = ' + res)

    const response = document.getElementById('response').value
    const providerid = document.getElementById('providerid').value
    sdk.reserveOrder(response, providerid).then((res2) => {
        console.log('res2 = ' + res2)
    }).catch((err) => {
        console.log('Failed to reserve order with error = ' + err)
    })
}

fulfillOrder = () => {
    let merchantName = 'Oyo Rooms'
    let metadata = [{
        "Movie Name": "Avengers"
    }, {"Seats": "3A, 3B, 3C"}]
    let timeoutInterval = 480000

    /**
     * {
        "merchantId": "TICKETNEWTEST",
        "merchantTransactionId": "transactionId010",
        "reservationId": "W1803281253545745701305",
        "serviceCategory": "MOVIE",
        "validFor": 86400,
        "payableAmount": 5000,
        "quantity": 2
    }
     **/
    // Replace this with the response from swagger's /v2/webapp/txn/reserve
    let context = 'eyJtZXJjaGFudElkIjoiT1lPVEVTVCIsIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6InFlemFlb2xvdGttdDFrNzNubjdqcWs0bCIsInJlc2VydmF0aW9uSWQiOiJSMTkwMzI4MTE1OTI1OTY4MjgyNDM3MiIsInNlcnZpY2VSZXF1ZXN0SWQiOiJPMTkwMzI4MTE1OTEzMjIxMjgyNDI0MCIsInNlcnZpY2VDYXRlZ29yeSI6IkhPVEVMIiwidmFsaWRGb3IiOjAsInZhbGlkVGlsbCI6MCwicGF5YWJsZUFtb3VudCI6MTY4MTAwLCJzZXJ2aWNlVHlwZVZlcnNpb24iOiJWMiJ9'

    /**
     * openPaymentsPage(fallbackURL: string, merchantName: string, context: { [key: string]: any }, imageURL?: string, metaData?: { [key: string]: string }): Promise<any> | void {
     }
     * **/

        // let actionButtonProp = new PhonePe.PaymentModels.ActionButtonProp('Done')
        // let confirmationState = { [PhonePe.PaymentModels.TransactionState.COMPLETED] : actionButtonProp }
        sdk.openPaymentsPageForReservedOrder(merchantName, context, "", "").then((response) => {
            console.log("Payment was successful = " + response)
        }).catch((err) => {
            console.log("Payment failed with error = " + err)
        })
}

selectFile = () => {
    console.log('Inside selectFile() method')
        let res = sdk.isMethodSupported('selectFile')
        console.log('selectFile method supported = ' + res)

        sdk.selectFile('image', true).then((res2) => {

            // Now read the data from the URI
            console.log('res2 = ' + res2)
            let uri = res2[0].uri
            let supported = sdk.isMethodSupported('readFile')

            console.log('readFile method supported = ' + supported)
            sdk.readFile(uri, 0, 200).then((res4) => {
                console.log('res2 = ' + res4)
                alert('res2 = ' + res4)
            }).catch((err) => {
                console.log('Failed to select file with error = ' + err)
            })

        }).catch((err) => {
            console.log('Failed to select file with error = ' + err)
        })
}

proceedToPayWeb = () =>  {
    const rid = document.getElementById("reservationId").value
    const fallbackURL = 'https://www.google.com/'
        sdk.proceedToPay(rid, fallbackURL).then(res => {
            alert(res)
        }).catch(err => alert(err))
}

refresh = () => {
    window.location.reload(true)
}
  
  render() {
    return (
      <div className="App">
        <header style={{backgroundColor: 'white'}} className="App-header">
            <p style={{color: 'rgba(103,64,180)', fontWeight: 'bold'}}>
              Welcome to PhonePe SDK Integration
            </p>
            <div>
            <input type="text" id="key" name="key" placeholder="key"/>
            <input type="text" id="value" name="value" placeholder="value" />
              <button onClick=  {() => this.setData()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>setData</p>
              </button>
            </div>
            <div>
            <input type="text" id="getdata-key" name="key" placeholder="getdata key"/>
              <button onClick=  {() => this.getData()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>getData</p>
              </button>
            </div>
            <div>
            <input type="text" id="removedata-key" name="key" placeholder="removedata key"/>
              <button onClick={() => this.removeData()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>removeData</p>
              </button>
            </div>
              <button onClick={() => this.startUpdatingLocation()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>startUpdatingLocation</p>
              </button>
              <button onClick=  {() => this.stopUpdatingLocation()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>stopUpdatingLocation</p>
              </button>
              <button onClick=  {() => this.registerLocationUpdateSuccessCallback()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>registerLocationUpdateSuccessCallback</p>
              </button>
              <button onClick={() => this.registerLocationUpdateFailureCallback()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>registerLocationUpdateFailureCallback</p>
              </button>
              <button onClick={() => this.getCurrentLocation()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>getCurrentLocation</p>
              </button>
              <button onClick=  {() => this.navigateToTransactionDetails()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>navigateToTransactionDetails</p>
              </button>
              <button onClick=  {() => this.navigateToPayments()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>navigateToPayments</p>
              </button>
              <button onClick=  {() => this.seekPermission()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>seekPermission</p>
              </button>
              <button onClick={() => this.openSettingsPage()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>openSettingsPage</p>
              </button>
              <button onClick={() => this.logMerchantEvent()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>logMerchantEvent</p>
              </button>
              <div>
              <input type="text" id="response" name="key" placeholder="response"/>
            <input type="text" id="providerid" name="value" placeholder="provider id" />
              <button onClick={() => this.reserveOrder()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>reserveOrder</p>
              </button>
              </div>
              <button onClick=  {() => this.fulfillOrder()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>fulfillOrder</p>
              </button>
              <button onClick=  {() => this.selectFile()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>selectFile</p>
              </button>
              <div>
              <input type="text" id="reservationId" name="key" placeholder="reservationId"/>
              <button onClick={() => this.proceedToPayWeb()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>proceedToPayWeb</p>
              </button>
              </div>
              <button onClick=  {() => this.refresh()} style={{padding: 16, borderRadius: 8, backgroundColor :'rgba(103,64,180)'}}>
                <p style={{color: 'white'}}>refresh</p>
              </button>
        </header>
      </div>
    )
  }
}

export default App;
