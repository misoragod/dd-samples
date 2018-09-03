**DroneDeployのApp Market用のサンプルアプリケーション** 
  
| Sample        | 概要           |
| :------------- |:-------------|
|Hello      |ダッシュボードにHello Worldを表示する。 |
|Login      |ダッシュボードにLogin画面を表示する。      |
|GetFlightLog |フライトログを取得する。      |
|MapAPI||
|GetImages||    
|Plans/GetAll|全プランの詳細を取得する。| 
|Plans/GetCurrentlyView|現在のプランの詳細を取得する。
|Plans/GetCurrentlyJson|現在のプランの詳細をjson形式でダウンロードする。|   
|Azure/ConnectAzure|DDからAzureのStorage Queueへメセージを送信する。|  
|Azure/SendMail|DDから取得したユーザーアカウント（email address)を　|　
|              |Azureへ送信し、Azureからそのemail addressへメールを返信する。|　　　
|Azure/UploadPlan|DDからダウンロードしたフライトプランをAzure Storage Blobへアップロードする。|　　　　　
   
###Plan/GetALL, GetCurrentlyView,GetCurrentlyJson  

APIの戻り値がnullのケースを考慮し、正常に動作するように修正。

