
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Image, Shield, UserX, AlertTriangle, Phone, Info, Lock, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Mock data for chats
const mockChats = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Raj Kumar',
      avatar: null,
    },
    lastMessage: {
      text: 'Is the room still available?',
      time: '10:30 AM',
      unread: true,
    },
    isContactShared: false,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Priya Singh',
      avatar: null,
    },
    lastMessage: {
      text: 'Can I schedule a visit tomorrow?',
      time: 'Yesterday',
      unread: false,
    },
    isContactShared: true,
  }
];

// Mock messages for a chat
const mockMessages = [
  {
    id: 'm1',
    senderId: 'u1',
    text: 'Hi, I saw your listing for the 2BHK in Koramangala. Is it still available?',
    time: '10:30 AM',
    status: 'sent',
  },
  {
    id: 'm2',
    senderId: 'currentUser',
    text: 'Yes, it\'s still available! Are you looking to move in immediately?',
    time: '10:35 AM',
    status: 'read',
  },
  {
    id: 'm3',
    senderId: 'u1',
    text: 'I was hoping to move in next month. Would that work?',
    time: '10:37 AM',
    status: 'sent',
  },
  {
    id: 'm4',
    senderId: 'currentUser',
    text: 'That should be fine. Would you like to see the place first?',
    time: '10:40 AM',
    status: 'read',
  },
  {
    id: 'm5',
    senderId: 'u1',
    text: 'Yes, that would be great. When are you available for a viewing?',
    time: '10:45 AM',
    status: 'sent',
  },
];

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState(mockMessages);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: `m${messages.length + 1}`,
      senderId: 'currentUser',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
  };

  const handleShareContact = () => {
    toast({
      title: 'Contact Shared',
      description: 'Your contact details have been shared with this user.',
    });
    setShowContactDialog(false);
    // Update local state to reflect contact being shared
    setChats(chats.map(chat => 
      chat.id === activeChat ? { ...chat, isContactShared: true } : chat
    ));
  };

  const handleReport = (reason: string) => {
    toast({
      title: 'User Reported',
      description: 'Thank you for your report. We will review it shortly.',
    });
    setShowReportDialog(false);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {!activeChat ? (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              
              {chats.length ? (
                chats.map(chat => (
                  <div 
                    key={chat.id}
                    className="flex items-center p-3 border-b cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSelectChat(chat.id)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {chat.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{chat.user.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.lastMessage.time}</span>
                      </div>
                      <p className="text-sm line-clamp-1 text-muted-foreground">
                        {chat.lastMessage.text}
                      </p>
                      <div className="flex items-center mt-1">
                        {chat.isContactShared ? (
                          <Badge variant="outline" className="text-xs px-1.5 bg-green-100 text-green-800 border-green-200">
                            <Phone className="h-3 w-3 mr-1" /> Contact Shared
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs px-1.5 bg-blue-100 text-blue-800 border-blue-200">
                            <Lock className="h-3 w-3 mr-1" /> Anonymous Chat
                          </Badge>
                        )}
                      </div>
                    </div>
                    {chat.lastMessage.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary ml-2"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your conversations with other users will appear here
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Browse Listings
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setActiveChat(null)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    R
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Raj Kumar</div>
                  <div className="text-xs text-muted-foreground">
                    Last active: 20 minutes ago
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowContactDialog(true)}
                >
                  <Phone className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowReportDialog(true)}
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="space-y-3">
                <Card className="bg-primary/5 border-primary/20 mb-6">
                  <CardContent className="p-3 text-sm">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Chat Safety Tips</p>
                        <ul className="list-disc pl-5 text-muted-foreground mt-1 space-y-1">
                          <li>Don't share payment details before viewing</li>
                          <li>Meet in public places for the first time</li>
                          <li>Report suspicious behavior</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.senderId === 'currentUser' 
                          ? 'bg-primary text-primary-foreground rounded-br-none' 
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${
                        msg.senderId === 'currentUser' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Image className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  className="shrink-0"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
        
        {/* Share Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Contact Information?</DialogTitle>
              <DialogDescription>
                This will allow Raj Kumar to see your phone number and contact you directly.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center border border-amber-200 bg-amber-50 rounded-md p-3 mb-4">
                <Shield className="h-5 w-5 text-amber-500 mr-2" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Safety Reminder</p>
                  <p className="text-amber-700">Only share your contact details with users you trust.</p>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted p-4 mb-4 text-center">
                <span className="block text-xl font-bold mb-2">+91 9812345678</span>
                <span className="text-sm text-gray-500">This is the number that will be shared</span>
              </div>
            </div>
            <DialogFooter className="flex sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowContactDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleShareContact}
                className="bg-primary hover:bg-primary/90"
              >
                Share Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Report Dialog */}
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report User</DialogTitle>
              <DialogDescription>
                Please select a reason for reporting this user.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Tabs defaultValue="inappropriate">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="inappropriate">Inappropriate</TabsTrigger>
                  <TabsTrigger value="spam">Spam</TabsTrigger>
                  <TabsTrigger value="scam">Scam</TabsTrigger>
                </TabsList>
                
                <TabsContent value="inappropriate">
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Harassment or bullying')}
                    >
                      <UserX className="h-4 w-4 mr-2" /> Harassment or bullying
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Inappropriate content')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" /> Inappropriate content
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Offensive language')}
                    >
                      <UserX className="h-4 w-4 mr-2" /> Offensive language
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="spam">
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Excessive messages')}
                    >
                      <UserX className="h-4 w-4 mr-2" /> Excessive messages
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Irrelevant content')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" /> Irrelevant content
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="scam">
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Fake listing')}
                    >
                      <UserX className="h-4 w-4 mr-2" /> Fake listing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Asked for money in advance')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" /> Asked for money in advance
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleReport('Suspicious behavior')}
                    >
                      <UserX className="h-4 w-4 mr-2" /> Suspicious behavior
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Your report will be reviewed by our team. We'll take appropriate action based on our community guidelines.
                </p>
                <p className="text-xs flex items-center">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <a href="#" className="text-primary hover:underline">
                    View our community guidelines
                  </a>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Chat;
