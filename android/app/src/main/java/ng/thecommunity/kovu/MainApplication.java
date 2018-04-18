package ng.thecommunity.kovu;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.wix.RNCameraKit.RNCameraKitPackage;
import com.airbnb.android.react.lottie.LottiePackage;

import com.oblador.vectoricons.VectorIconsPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

// import io.realm.react.RealmReactPackage;

import com.microsoft.codepush.react.ReactInstanceHolder;
import com.oblador.vectoricons.VectorIconsPackage;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private class MyReactNativeHost extends ReactNativeHost implements ReactInstanceHolder{

    MyReactNativeHost(Application application) {
      super(application);
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new RNDeviceInfo(),
            // new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),

            new PhotoViewPackage(),
            new LinearGradientPackage(),
            new WebViewBridgePackage(),
            new RNSpinkitPackage(),
            new PickerPackage(),
            new RNGoogleSignInPackage(),
            new FBSDKPackage(mCallbackManager),
            // new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNCameraKitPackage(),
            new BlurViewPackage(),



            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new LottiePackage(),
              new VectorIconsPackage(),
              new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }
  }
  private final MyReactNativeHost mReactNativeHost = new MyReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    CodePush.setReactInstanceHolder(mReactNativeHost);
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
