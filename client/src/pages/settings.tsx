import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings as SettingsIcon, User, VideoIcon, Bell } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <VideoIcon className="h-5 w-5 text-gray-500" />
              <CardTitle>Video Processing</CardTitle>
            </div>
            <CardDescription>
              Configure how videos are processed and summarized
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transcription-model">Transcription Model</Label>
              <RadioGroup defaultValue="whisper-1" id="transcription-model">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whisper-1" id="whisper-1" />
                  <Label htmlFor="whisper-1">Whisper (Standard)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whisper-large" id="whisper-large" />
                  <Label htmlFor="whisper-large">Whisper Large (Enhanced)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary-length">Summary Length</Label>
              <RadioGroup defaultValue="medium" id="summary-length">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short (1-2 paragraphs)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (3-4 paragraphs)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long (5+ paragraphs)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="extract-timestamps">Extract Timestamps</Label>
                <p className="text-sm text-gray-500">Include time markers in transcripts</p>
              </div>
              <Switch id="extract-timestamps" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="speaker-detection">Speaker Detection</Label>
                <p className="text-sm text-gray-500">Identify different speakers in the transcript</p>
              </div>
              <Switch id="speaker-detection" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-processing">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive emails when processing completes</p>
              </div>
              <Switch id="email-processing" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser-notifications">Browser Notifications</Label>
                <p className="text-sm text-gray-500">Show notifications in your browser</p>
              </div>
              <Switch id="browser-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="processing-updates">Processing Updates</Label>
                <p className="text-sm text-gray-500">Get notified about processing progress</p>
              </div>
              <Switch id="processing-updates" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <CardTitle>Account</CardTitle>
            </div>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Email Address</Label>
              <p className="text-sm font-medium">user@example.com</p>
            </div>
            
            <div className="space-y-1">
              <Label>Plan</Label>
              <p className="text-sm font-medium">Free Trial (14 days remaining)</p>
            </div>
            
            <div className="space-y-1">
              <Label>Usage</Label>
              <p className="text-sm font-medium">3 videos processed (150MB) / 10 video limit</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Change Email</Button>
            <Button variant="secondary">Upgrade Plan</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-gray-500" />
              <CardTitle>System</CardTitle>
            </div>
            <CardDescription>
              Configure system preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-500">Toggle between light and dark theme</p>
              </div>
              <Switch id="dark-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-play">Auto Play Videos</Label>
                <p className="text-sm text-gray-500">Automatically play videos when opened</p>
              </div>
              <Switch id="auto-play" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-history">Save Processing History</Label>
                <p className="text-sm text-gray-500">Keep a record of all processed videos</p>
              </div>
              <Switch id="save-history" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
